import { useEffect, useRef, useSyncExternalStore } from "react";
import DexteriaBall from "../../components/DexteriaBall/DexteriaBall.jsx";
import { motion } from "../motion-controller.js";
import { startChoreography } from "./index.js";
import "./ball-layer.css";

// The one persistent Smart Ball: a fixed, full-viewport layer that sits behind
// or in front of the page content. Decorative, so aria-hidden. Pointer events
// are off on the layer; the choreographer turns them on for the hero preset only.
//
// In Calm mode the 3D scene is replaced by a still image of the same ball.

const STILL = "/assets/ball/smart-ball-still.webp"; // CHANGED: the new ball, without a baked-in shadow

const css = ({ x, y, scale, rz }) =>
  `translate3d(${x}px, ${y}px, 0) rotate(${rz}rad) scale(${scale})`;

export default function BallLayer() {
  const calm = useSyncExternalStore(motion.subscribe, () => motion.calm, () => false);
  const layerRef = useRef(null);
  const ballRef = useRef(null);
  const stillRef = useRef(null);
  const calmRef = useRef(calm);
  const choreoRef = useRef(null);
  calmRef.current = calm;

  useEffect(() => {
    const still = {
      setTransform: (t) => { if (stillRef.current) stillRef.current.style.transform = css(t); },
      setState: () => {},
      setPointerEvents: () => {},
      setPaused: () => {},
      spin: () => {},
      squeeze: () => {},
    };
    choreoRef.current = startChoreography({
      layerEl: layerRef.current,
      getApi: () => (calmRef.current ? still : ballRef.current),
    });
    return () => choreoRef.current?.stop();
  }, []);

  // The ball component was swapped: bring the new one to the current pose.
  useEffect(() => { choreoRef.current?.refresh(); }, [calm]);

  return (
    <div className="ball-layer" ref={layerRef} aria-hidden="true" data-layer="back">
      {calm ? (
        <img ref={stillRef} className="ball-stage ball-stage--still" src={STILL} alt="" width="720" height="480" decoding="async" />
      ) : (
        <DexteriaBall
          ref={ballRef}
          className="ball-stage"
          style={{ position: undefined, width: undefined, height: undefined }} /* size and position come from ball-layer.css */
          color="#808475" /* CHANGED: brand ball colour, same ball as the hero */
          logoSpan={0.85}
          logoOffset={[-0.1, -0.12]}
          engrave={0.2}
          shadow={false} /* CHANGED: the ground shadow exists only in the hero */
          maxPixelRatio={1.5}
          background="transparent"
          logo="d"
          hint=""
          fallbackSrc={STILL}
        />
      )}
    </div>
  );
}
