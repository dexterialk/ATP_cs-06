// 10 Waitlist: validation and Brevo submission.
//
// Brevo's form endpoint accepts `?isAjax=1`, answers with JSON
// ({ "success": true }) and allows cross-origin requests from the site, so the
// result can be read and shown. Brevo also answers success:true to an empty
// submission, so the email must be validated here before sending.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MESSAGES = {
  emailMissing: "Enter your email address.",
  emailInvalid: "Enter an email address in the format name@example.com.",
  consentMissing: "Tick the box to agree before you join the waitlist.",
  sending: "Sending…",
  success: "✓ You’re on the list! Thanks for joining Dexteria.",
  failure: "Sorry, we could not add you just now. Check your connection and try again.",
};

export function initWaitlist(form) {
  if (!form) return;
  const email = form.querySelector('[name="EMAIL"]');
  const consent = form.querySelector("[data-consent]");
  const status = form.querySelector("[data-form-status]");
  const submit = form.querySelector('[type="submit"]');

  // JavaScript takes over validation so errors appear inline, in our words.
  form.noValidate = true;

  function setError(input, message) {
    const error = form.querySelector(`[data-error-for="${input.id}"]`);
    if (message) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
    if (error) error.textContent = message || "";
  }

  function setStatus(message, tone) {
    status.textContent = message;
    if (tone) status.dataset.tone = tone;
    else delete status.dataset.tone;
  }

  function validate() {
    email.value = email.value.trim();
    const problems = [];
    if (!email.value) problems.push([email, MESSAGES.emailMissing]);
    else if (!EMAIL_PATTERN.test(email.value)) problems.push([email, MESSAGES.emailInvalid]);
    if (!consent.checked) problems.push([consent, MESSAGES.consentMissing]);

    setError(email, problems.find(([el]) => el === email)?.[1]);
    setError(consent, problems.find(([el]) => el === consent)?.[1]);
    return problems;
  }

  // Clear an error as soon as the field becomes valid. Never block typing.
  email.addEventListener("input", () => {
    if (email.getAttribute("aria-invalid") && EMAIL_PATTERN.test(email.value.trim())) setError(email, "");
  });
  consent.addEventListener("change", () => {
    if (consent.checked) setError(consent, "");
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (form.dataset.state === "sending") return;

    const problems = validate();
    if (problems.length) {
      setStatus(problems.length === 1
        ? "There is 1 problem with the form."
        : `There are ${problems.length} problems with the form.`, "error");
      problems[0][0].focus();
      return;
    }

    form.dataset.state = "sending";
    submit.disabled = true;
    setStatus(MESSAGES.sending);

    try {
      const url = new URL(form.action);
      url.searchParams.set("isAjax", "1");
      const response = await fetch(url, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      let ok = response.ok;
      try {
        const data = await response.json();
        if (data && data.success === false) ok = false;
      } catch { /* not JSON: rely on the HTTP status */ }
      if (!ok) throw new Error(`Brevo responded ${response.status}`);

      form.reset();
      setStatus(MESSAGES.success, "success");
    } catch (error) {
      console.error("[waitlist]", error);
      setStatus(MESSAGES.failure, "error");
    } finally {
      delete form.dataset.state;
      submit.disabled = false;
      // Disabling a focused button can drop focus to <body>; put it back.
      if (document.activeElement === document.body) submit.focus();
    }
  });
}
