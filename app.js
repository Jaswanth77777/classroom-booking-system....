document.addEventListener("DOMContentLoaded", () => {
  // OTP boxes: move forward automatically and support backspace/paste.
  const boxes = [...document.querySelectorAll(".otp")];
  const form = document.getElementById("otpForm");
  const code = document.getElementById("code");
  if (boxes.length && form) {
    boxes[0].focus();
    boxes.forEach((box, i) => {
      box.addEventListener("input", () => {
        box.value = box.value.replace(/\D/g, "").slice(0, 1);
        if (box.value && i < boxes.length - 1) boxes[i + 1].focus();
      });
      box.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !box.value && i > 0) boxes[i - 1].focus();
      });
      box.addEventListener("paste", (e) => {
        const pasted = (e.clipboardData || window.clipboardData).getData("text").replace(/\D/g, "").slice(0, 6);
        if (!pasted) return;
        e.preventDefault();
        pasted.split("").forEach((digit, j) => { if (boxes[j]) boxes[j].value = digit; });
        boxes[Math.min(pasted.length, boxes.length) - 1].focus();
      });
    });
    form.addEventListener("submit", () => {
      code.value = boxes.map(b => b.value).join("");
    });
  }

  document.querySelectorAll(".book-room").forEach(btn => {
    btn.addEventListener("click", () => {
      const select = document.getElementById("roomSelect");
      const panel = document.getElementById("bookingPanel");
      if (select) select.value = btn.dataset.room;
      if (panel) panel.scrollIntoView({behavior:"smooth", block:"center"});
    });
  });

  const date = document.querySelector('input[name="booking_date"]');
  if (date) date.min = new Date().toISOString().slice(0,10);

  setTimeout(() => document.querySelectorAll(".toast").forEach(t => t.remove()), 6000);
});

document.addEventListener("DOMContentLoaded", () => {
  const password = document.getElementById("password");
  const toggle = document.getElementById("togglePassword");
  if (password && toggle) {
    toggle.addEventListener("click", () => {
      const show = password.type === "password";
      password.type = show ? "text" : "password";
      toggle.textContent = show ? "◉" : "◌";
      toggle.setAttribute("aria-label", show ? "Hide password" : "Show password");
    });
  }

  const loginForm = document.querySelector('.login-card form[method="post"]');
  const loginButton = document.getElementById("loginButton");
  if (loginForm && loginButton) {
    loginForm.addEventListener("submit", () => {
      loginButton.disabled = true;
      loginButton.innerHTML = '<span>Authenticating…</span><span class="spinner"></span>';
    });
  }
});
