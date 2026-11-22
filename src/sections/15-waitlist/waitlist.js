// 10 Waitlist: confirmation message (Sima 01's script, moved out of the page).
//
// The form posts to Brevo through the hidden iframe "brevoFrame", so the page itself
// never sees Brevo's answer. After submitting, this script disables the button briefly,
// then shows the confirmation, clears the field and re-enables the button.

export function initWaitlist() {
  const waitlistForm = document.getElementById("subscribeForm");
  const waitlistNote = document.getElementById("formNote");

  if (waitlistForm && waitlistNote) {
    waitlistForm.addEventListener("submit", () => {
      const button = waitlistForm.querySelector("button");
      button.disabled = true;

      setTimeout(() => {
        waitlistNote.classList.remove("pop");
        void waitlistNote.offsetWidth;
        waitlistNote.textContent = "✓ You're on the list! Thanks for joining Dexteria.";
        waitlistNote.classList.add("pop");
        waitlistForm.reset();
        button.disabled = false;
      }, 800);
    });
  }
}
