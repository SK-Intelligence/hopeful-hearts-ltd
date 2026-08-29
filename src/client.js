const header = document.querySelector("[data-site-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const mainContent = document.querySelector("main");
const siteFooter = document.querySelector("footer");

function setMenu(open, { returnFocus = false } = {}) {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute("aria-expanded", String(open));
  mobileMenu.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("menu-open", open);
  if (mainContent) mainContent.inert = open;
  if (siteFooter) siteFooter.inert = open;

  if (open) {
    mobileMenu.querySelector("a")?.focus();
  } else if (returnFocus) {
    menuToggle.focus();
  }
}

menuToggle?.addEventListener("click", () => {
  setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    setMenu(false, { returnFocus: true });
  }
});

document.addEventListener("pointerdown", (event) => {
  if (
    menuToggle?.getAttribute("aria-expanded") === "true" &&
    header &&
    !header.contains(event.target)
  ) {
    setMenu(false);
  }
});

const desktopQuery = window.matchMedia("(min-width: 1081px)");
desktopQuery.addEventListener("change", ({ matches }) => {
  if (matches) setMenu(false);
});

document.querySelectorAll("[data-faq-button]").forEach((button) => {
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    button.setAttribute("aria-expanded", String(!expanded));
    panel?.setAttribute("aria-hidden", String(expanded));
  });
});

const form = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

function errorMessage(field) {
  if (field.validity.valueMissing) {
    return field.tagName === "TEXTAREA" ? "Please enter a message." : `Please enter your ${field.name === "firstName" ? "first name" : field.name === "lastName" ? "last name" : "email address"}.`;
  }
  if (field.validity.typeMismatch) return "Enter an email address in the format name@example.com.";
  return "";
}

function validateField(field) {
  const message = errorMessage(field);
  const error = document.getElementById(`${field.id}-error`);
  field.setAttribute("aria-invalid", String(Boolean(message)));
  if (error) error.textContent = message;
  return !message;
}

if (form) {
  const fields = [...form.querySelectorAll("input, textarea")];
  const hasDraft = () => fields.some((field) => field.value.trim().length > 0);

  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const valid = fields.map(validateField).every(Boolean);

    if (!valid) {
      formStatus.textContent = "Please correct the highlighted fields before continuing.";
      fields.find((field) => field.getAttribute("aria-invalid") === "true")?.focus();
      return;
    }

    const submitButton = form.querySelector("button[type='submit']");
    submitButton.disabled = true;
    submitButton.textContent = "Checking enquiry…";
    formStatus.textContent = "";

    window.setTimeout(() => {
      submitButton.disabled = false;
      submitButton.textContent = "Submit enquiry";
      formStatus.textContent =
        "Your details are valid, but this local build cannot send them yet. Please email info@hopefulheartsltd.com or call +353 87 277 9096.";
      formStatus.focus();
    }, 300);
  });

  window.addEventListener("beforeunload", (event) => {
    if (!hasDraft()) return;
    event.preventDefault();
  });
}
