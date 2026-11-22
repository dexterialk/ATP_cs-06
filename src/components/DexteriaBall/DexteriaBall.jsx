"use client"
// DexteriaBall — a floating, squeezable 3D ball (Three.js r128).
// Install:  npm install three@0.128.0
import { useEffect, useImperativeHandle, useRef } from "react"
import * as THREE from "three"
import { LOGO_MAPS } from "./dexteriaLogoMaps"

// Imperative API (pass a ref):
//   setTransform({ x, y, scale, rx, ry, rz })  moves the container (px, scale, radians); rx/ry also turn the ball
//   setState(name)                              records a named state on the container (data-state)
//   setPointerEvents(on)                        lets the ball's disc take (or ignore) the pointer
//   spin()                                      one full 360-degree turn; ignored while already spinning
//   squeeze()                                   the same squeeze as press-and-hold, for keyboard users
export default function DexteriaBall({
  ref,
  enabled = true,          // false = static ball, no animation, no interaction, no GPU work after first frame
  interactive = true,      // false = it floats on its own but ignores the pointer
  pauseOnScroll = true,    // true = no lean / squeeze while the page is scrolling
  logo = "d",              // "d" (letter only) or "full" (letter + dexteria)
  color = "#8C9986",
  background = "#EDEAE2",  // "transparent" to let your page show through
  hint = "Press and hold to squeeze", // "" to hide
  fallbackSrc = "",        // still image shown when WebGL is unavailable
  logoSpan = 1.25,         // smaller = bigger logo
  engrave = 1.0,           // engraving depth
  buttonDir = [0.78, 0.4, 0.48],
  className,
  style,
}) {
  const rootRef = useRef(null)
  const shadowRef = useRef(null)
  const hintRef = useRef(null)
  const hitRef = useRef(null)
  const offset = useRef({ rx: 0, ry: 0 })     // extra rotation set through setTransform
  const actions = useRef({})                  // spin / squeeze, filled in by the scene below
  const btnKey = buttonDir.join(",")

  useImperativeHandle(ref, () => ({
    setTransform({ x = 0, y = 0, scale = 1, rx = 0, ry = 0, rz = 0 } = {}) {
      offset.current.rx = rx; offset.current.ry = ry
      const el = rootRef.current
      if (el) el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rz}rad) scale(${scale})`
    },
    setState(name) { if (rootRef.current) rootRef.current.dataset.state = name },
    setPointerEvents(on) { if (hitRef.current) hitRef.current.style.pointerEvents = on ? "auto" : "none" },
    spin() { actions.current.spin?.() },
    squeeze() { actions.current.squeeze?.() },
  }), [])

  useEffect(() => {
    const root = rootRef.current, shadow = shadowRef.current, hintEl = hintRef.current
    if (!root) return
    const D2R = Math.PI / 180
    const reduced = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    const animate = enabled
    let disposed = false, raf = 0, running = false, visible = true, scrollUntil = 0

    let renderer
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }) }
    catch (e) {
      console.warn("DexteriaBall: WebGL unavailable", e)
      if (fallbackSrc) { root.style.backgroundImage = `url(${fallbackSrc})`; root.style.backgroundSize = "contain"; root.style.backgroundPosition = "center"; root.style.backgroundRepeat = "no-repeat" }
      return
    }
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.0 // brighter, highlights stay unclipped
    const cvs = renderer.domElement
    cvs.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block"
    root.insertBefore(cvs, root.firstChild)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50)
    scene.add(new THREE.HemisphereLight(0xffffff, 0xe3ddcf, 0.8))
    const key = new THREE.DirectionalLight(0xfff4e6, 0.85); key.position.set(-3, 4, 4); scene.add(key)
    const fill = new THREE.DirectionalLight(0xffffff, 0.4); fill.position.set(4, 0.5, 2); scene.add(fill)
    const rim = new THREE.DirectionalLight(0xffffff, 0.2); rim.position.set(2, 2, -3); scene.add(rim)

    // Procedural photo studio: softboxes + cream bounce, baked to an environment map
    const envS = new THREE.Scene(); envS.background = new THREE.Color(0.16, 0.15, 0.14)
    const envMeshes = []
    const softbox = (w, h, x, y, z, r, g, b) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }))
      m.material.color.setRGB(r, g, b); m.position.set(x, y, z); m.lookAt(0, 0, 0); envS.add(m); envMeshes.push(m); return m
    }
    softbox(6, 5, -5, 4.5, 5, 4.5, 4.4, 4.2)
    softbox(1.4, 6, 7, 1, 2, 2.2, 2.3, 2.6)
    softbox(5, 1.6, 3, 4, -5, 2.2, 2.2, 2.2)
    softbox(14, 14, 0, -4, 0, 0.75, 0.72, 0.65).rotation.set(-Math.PI / 2, 0, 0)
    const pmrem = new THREE.PMREMGenerator(renderer)
    const envRT = pmrem.fromScene(envS, 0.03)
    scene.environment = envRT.texture

    // Ball: a sphere whose vertices are re-shaped each frame for the squeeze
    const geo = new THREE.SphereGeometry(1, 80, 56)
    const pos = geo.attributes.position, uv = geo.attributes.uv, nrm = geo.attributes.normal, N = pos.count
    const base = new Float32Array(N * 3), t1s = new Float32Array(N * 3), t2s = new Float32Array(N * 3)
    const XV = new THREE.Vector3(1, 0, 0), Y = new THREE.Vector3(0, 1, 0)
    const V = new THREE.Vector3(), A = new THREE.Vector3(), B = new THREE.Vector3()
    for (let i = 0; i < N; i++) {
      V.fromBufferAttribute(pos, i).normalize()
      base.set([V.x, V.y, V.z], i * 3)
      A.copy(Math.abs(V.y) < 0.99 ? Y : XV).cross(V).negate().normalize()
      B.copy(V).cross(A).normalize()
      t1s.set([A.x, A.y, A.z], i * 3); t2s.set([B.x, B.y, B.z], i * 3)
      if (V.z > 0) uv.setXY(i, V.x / logoSpan + 0.5, V.y / logoSpan + 0.5); else uv.setXY(i, 5, 5)
    }
    const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color(color).convertSRGBToLinear(), roughness: 0.6, metalness: 0, envMapIntensity: 0.55 })
    const ball = new THREE.Mesh(geo, mat)
    const group = new THREE.Group(); group.rotation.order = "YXZ"; group.add(ball); scene.add(group)

    // Side button
    const bDir = new THREE.Vector3(...buttonDir).normalize()
    const btn = new THREE.Group()
    const metal = new THREE.MeshStandardMaterial({ color: 0xb9bcb6, metalness: 0.85, roughness: 0.3 })
    const dark = new THREE.MeshStandardMaterial({ color: 0x4a4f48, roughness: 0.6 })
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.135, 0.05, 40), metal)
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.088, 0.088, 0.05, 40), dark); disc.position.y = 0.006
    const dot = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.05, 20), metal); dot.position.y = 0.012
    btn.add(ring, disc, dot); group.add(btn)
    const bt1 = bDir.clone().cross(Y).normalize(), bt2 = new THREE.Vector3().crossVectors(bDir, bt1).normalize()

    // Squeeze maths
    const C = new THREE.Vector3(0, 0, 1)
    let S = 0, Sv = 0, down = false
    const F = (v, o) => {
      const d = v.dot(C), k = 1 - 0.26 * S, kp = 1 + 0.13 * S, dent = 0.16 * S * Math.exp(-(1 - d) * 9), m = d * (k - kp)
      o.set(v.x * kp + C.x * m - C.x * dent, v.y * kp + C.y * m - C.y * dent, v.z * kp + C.z * m - C.z * dent)
    }
    const P0 = new THREE.Vector3(), P1 = new THREE.Vector3(), P2 = new THREE.Vector3(), Q = new THREE.Vector3(), nn = new THREE.Vector3(), E = 0.01
    const surface = (v, t1, t2, outN) => {
      F(v, P0)
      Q.copy(v).addScaledVector(t1, E).normalize(); F(Q, P1)
      Q.copy(v).addScaledVector(t2, E).normalize(); F(Q, P2)
      P1.sub(P0); P2.sub(P0); outN.crossVectors(P1, P2).normalize()
    }
    const deform = () => {
      for (let i = 0; i < N; i++) {
        V.fromArray(base, i * 3); A.fromArray(t1s, i * 3); B.fromArray(t2s, i * 3)
        surface(V, A, B, nn)
        pos.setXYZ(i, P0.x, P0.y, P0.z); nrm.setXYZ(i, nn.x, nn.y, nn.z)
      }
      pos.needsUpdate = true; nrm.needsUpdate = true
      surface(bDir, bt1, bt2, nn)
      btn.position.copy(P0); btn.quaternion.setFromUnitVectors(Y, nn)
    }
    deform()

    // Logo engraving (colour darkening + bump), built from the height map
    const textures = []
    const img = new Image()
    img.onload = () => {
      if (disposed) return
      const cv = document.createElement("canvas"); cv.width = cv.height = 512
      const cx = cv.getContext("2d"); cx.drawImage(img, 0, 0)
      const id = cx.getImageData(0, 0, 512, 512), d = id.data
      for (let i = 0; i < d.length; i += 4) { const k = 255 * (0.7 + (0.3 * d[i]) / 255); d[i] = d[i + 1] = d[i + 2] = k; d[i + 3] = 255 }
      cx.putImageData(id, 0, 0)
      const cmap = new THREE.CanvasTexture(cv); cmap.encoding = THREE.sRGBEncoding
      const bmap = new THREE.Texture(img)
      ;[cmap, bmap].forEach((t) => {
        t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping
        t.generateMipmaps = false; t.minFilter = THREE.LinearFilter; t.magFilter = THREE.LinearFilter; t.needsUpdate = true
        textures.push(t)
      })
      mat.map = cmap; mat.bumpMap = bmap; mat.bumpScale = engrave; mat.needsUpdate = true
      if (!animate) renderer.render(scene, camera)
    }
    img.src = LOGO_MAPS[logo] || LOGO_MAPS.d

    // Layout
    let W = 1, H = 1, pxU = 100
    const resize = () => {
      W = Math.max(1, root.clientWidth); H = Math.max(1, root.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); renderer.setSize(W, H, false)
      camera.aspect = W / H
      const z = Math.max(5.6, 2.0 / (Math.tan(14 * D2R) * camera.aspect))
      camera.position.set(0, 0, z); camera.lookAt(0, 0, 0); camera.updateProjectionMatrix()
      pxU = H / (2 * z * Math.tan(14 * D2R))
      shadow.style.width = pxU * 1.9 + "px"; shadow.style.height = pxU * 0.3 + "px"
      shadow.style.top = H / 2 + pxU * 1.2 + "px"
      const hit = hitRef.current
      if (hit) { hit.style.width = hit.style.height = pxU * 2 + "px"; hit.style.left = W / 2 - pxU + "px"; hit.style.top = H / 2 - pxU + "px" }
      if (!animate) renderer.render(scene, camera)
    }
    const ro = new ResizeObserver(resize); ro.observe(root); resize()

    const cleanups = []
    let loop = () => {}
    if (animate) {
      // Pointer
      const ptr = { x: 0, y: 0, over: false }
      const ray = new THREE.Raycaster(), ndc = new THREE.Vector2()
      // The container can be scaled by setTransform, so convert screen pixels back to layout pixels
      const setPtr = (e) => { const r = root.getBoundingClientRect(), sx = W / (r.width || W), sy = H / (r.height || H); ptr.x = (e.clientX - r.left) * sx; ptr.y = (e.clientY - r.top) * sy; ptr.over = true }
      const scrolling = () => pauseOnScroll && performance.now() < scrollUntil
      const onMove = (e) => { if (interactive) setPtr(e) }
      const onLeave = () => { ptr.over = false }
      const onDown = (e) => {
        if (!interactive || scrolling()) return
        setPtr(e); ndc.set((ptr.x / W) * 2 - 1, -((ptr.y / H) * 2 - 1)); ray.setFromCamera(ndc, camera)
        group.updateMatrixWorld(true)
        const h = ray.intersectObject(ball)[0]
        if (h) {
          C.copy(ball.worldToLocal(h.point.clone())).normalize()
          down = true; if (hintEl) hintEl.style.opacity = 0
          if (e.pointerType === "mouse") { try { root.setPointerCapture(e.pointerId) } catch (_) {} }
        }
      }
      const onUp = (e) => { down = false; if (e && e.pointerType && e.pointerType !== "mouse") ptr.over = false }
      const onScroll = () => { scrollUntil = performance.now() + 180 }
      root.addEventListener("pointermove", onMove); root.addEventListener("pointerleave", onLeave)
      root.addEventListener("pointerdown", onDown); root.addEventListener("pointerup", onUp); root.addEventListener("pointercancel", onUp)
      window.addEventListener("scroll", onScroll, { passive: true, capture: true })
      cleanups.push(() => {
        root.removeEventListener("pointermove", onMove); root.removeEventListener("pointerleave", onLeave)
        root.removeEventListener("pointerdown", onDown); root.removeEventListener("pointerup", onUp); root.removeEventListener("pointercancel", onUp)
        window.removeEventListener("scroll", onScroll, { capture: true })
      })

      // Spin: one 360-degree turn (--dur-spin, 1.4 s). Ignored while a spin is running.
      let spinStart = -1, spinAngle = 0
      actions.current.spin = () => { if (reduced || spinStart >= 0) return; spinStart = performance.now() }
      // Squeeze without a pointer: press the middle of the ball for a moment, then let go.
      let squeezeTimer = 0
      actions.current.squeeze = () => {
        if (!interactive) return
        C.set(0, 0, 1); down = true; if (hintEl) hintEl.style.opacity = 0
        clearTimeout(squeezeTimer); squeezeTimer = setTimeout(() => { down = false }, 700)
      }
      cleanups.push(() => { clearTimeout(squeezeTimer); actions.current.spin = actions.current.squeeze = undefined })

      const st = { lx: 0, ly: 0, vx: 0, vy: 0, over: 0 }
      let T = 0, last = performance.now(), idle = false
      loop = (now) => {
        if (disposed) return
        if (!visible || document.hidden) { running = false; return }
        raf = requestAnimationFrame(loop)
        const dt = Math.min((now - last) / 1000, 0.05); last = now
        if (!reduced) T += dt
        const sc = scrolling()
        if (sc && down) down = false
        const on = ptr.over && interactive && !sc
        const kx = (ptr.x - W / 2) / pxU, ky = -(ptr.y - H / 2) / pxU, dist = Math.hypot(kx, ky)
        const near = on ? Math.exp(-Math.pow(Math.max(0, dist - 1) / 1.6, 2)) : 0
        const tx = on ? Math.max(-1, Math.min(1, kx / 1.3)) * near : 0, ty = on ? Math.max(-1, Math.min(1, ky / 1.3)) * near : 0
        st.over += (near - st.over) * (1 - Math.exp(-dt * 6))
        const w0 = 7
        st.vx += (w0 * w0 * (tx - st.lx) - 2 * w0 * st.vx) * dt; st.vy += (w0 * w0 * (ty - st.ly) - 2 * w0 * st.vy) * dt
        st.lx += st.vx * dt; st.ly += st.vy * dt
        const calm = 1 - 0.6 * st.over
        const yaw = -16 + 12 * calm * Math.sin((2 * Math.PI * T) / 8) + 28 * st.over * st.lx
        const nod = 5 * calm * Math.sin((2 * Math.PI * T) / 6) - 16 * st.over * st.ly
        const bob = 0.06 * calm * Math.sin((2 * Math.PI * T) / 4)
        if (spinStart >= 0) {
          const u = (now - spinStart) / 1400
          if (u >= 1) { spinStart = -1; spinAngle = 0 } else spinAngle = 2 * Math.PI * (u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2)
        }
        group.rotation.y = yaw * D2R + spinAngle + offset.current.ry; group.rotation.x = -nod * D2R + offset.current.rx
        group.rotation.z = 0.03 * Math.sin((2 * Math.PI * T) / 9.5) * calm
        const target = down ? 1 : 0, k0 = 18, zt = 0.26, n = 4, hs = dt / n
        for (let i = 0; i < n; i++) { const a = -k0 * k0 * (S - target) - 2 * zt * k0 * Sv; Sv += a * hs; S += Sv * hs }
        const moving = Math.abs(S - target) > 1e-4 || Math.abs(Sv) > 1e-3
        if (moving || !idle) { deform(); idle = !moving }
        group.position.set(0.1 * st.lx * st.over, bob - 0.07 * S, 0)
        const b = bob / 0.06
        shadow.style.opacity = String(0.9 - 0.25 * b + 0.15 * S)
        shadow.style.transform = "translateX(-50%) scale(" + (1 - 0.1 * b + 0.06 * S) + ")"
        renderer.render(scene, camera)
      }
      const start = () => { if (running || disposed) return; running = true; last = performance.now(); raf = requestAnimationFrame(loop) }
      const io = new IntersectionObserver((es) => { visible = es[es.length - 1].isIntersecting; if (visible) start() })
      io.observe(root)
      const onVis = () => { if (!document.hidden) start() }
      document.addEventListener("visibilitychange", onVis)
      cleanups.push(() => { io.disconnect(); document.removeEventListener("visibilitychange", onVis) })
      start()
    } else {
      renderer.render(scene, camera)
    }

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      cleanups.forEach((f) => f())
      ro.disconnect()
      img.onload = null
      textures.forEach((t) => t.dispose())
      ;[geo, ring.geometry, disc.geometry, dot.geometry].forEach((g) => g.dispose())
      ;[mat, metal, dark].forEach((m) => m.dispose())
      envMeshes.forEach((m) => { m.geometry.dispose(); m.material.dispose() })
      envRT.dispose(); pmrem.dispose()
      renderer.dispose()
      if (cvs.parentNode) cvs.parentNode.removeChild(cvs)
    }
  }, [enabled, interactive, pauseOnScroll, logo, color, logoSpan, engrave, btnKey, fallbackSrc])

  return (
    <div
      ref={rootRef}
      className={className}
      style={{
        position: "relative", width: "100%", height: "100%", overflow: "hidden", background,
        touchAction: "pan-y", userSelect: "none", WebkitUserSelect: "none", WebkitTouchCallout: "none",
        WebkitTapHighlightColor: "transparent", cursor: enabled && interactive ? "grab" : "default", ...style,
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        ref={shadowRef}
        style={{
          position: "absolute", left: "50%", top: 0, borderRadius: "50%", pointerEvents: "none", filter: "blur(5px)",
          background: "radial-gradient(ellipse at center, rgba(70,66,50,.42), rgba(70,66,50,0) 70%)",
        }}
      />
      {/* The ball's own disc is the only part that takes the pointer (when pointer events are on) */}
      <div
        ref={hitRef}
        style={{ position: "absolute", borderRadius: "50%", cursor: enabled && interactive ? "grab" : "default", touchAction: "pan-y" }}
      />
      {hint && enabled && interactive ? (
        <div
          ref={hintRef}
          style={{
            position: "absolute", left: 0, right: 0, bottom: 28, textAlign: "center", color: "#5d6656",
            fontSize: 14, letterSpacing: ".02em", opacity: 0.7, transition: "opacity .6s", pointerEvents: "none",
          }}
        >
          {hint}
        </div>
      ) : null}
    </div>
  )
}
