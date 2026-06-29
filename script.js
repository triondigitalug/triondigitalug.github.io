const WHATSAPP_NUMBER = "256000000000";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Trion%20Digital%2C%20I%20would%20like%20to%20ask%20about%20your%20digital%20services.`;

const initMenu = () => {
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelectorAll(".nav-links a");

  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
};

const initReveal = () => {
  const items = document.querySelectorAll("[data-reveal]");

  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  items.forEach((item) => observer.observe(item));
};

const initFaq = () => {
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isOpen = item.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
      item.querySelector(".faq-icon").textContent = isOpen ? "-" : "+";
    });
  });
};

const initPortfolioFilters = () => {
  const filters = document.querySelectorAll("[data-filter]");
  const projects = document.querySelectorAll("[data-category]");

  if (!filters.length || !projects.length) return;

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filters.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      projects.forEach((project) => {
        const shouldShow = filter === "all" || project.dataset.category === filter;
        project.hidden = !shouldShow;
      });
    });
  });
};

const initWhatsAppLinks = () => {
  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.setAttribute("href", WHATSAPP_URL);
  });
};

const initContactForm = () => {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const message = [
      "Hello Trion Digital, I would like a quote.",
      `Name: ${data.get("name") || ""}`,
      `Business: ${data.get("business") || ""}`,
      `Phone: ${data.get("phone") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Service: ${data.get("service") || ""}`,
      `Message: ${data.get("message") || ""}`
    ].join("\n");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    form.reset();
  });
};

const initThemeToggle = () => {
  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) return;

  const THEME_KEY = "theme";
  const THEME_DARK = "dark";
  const THEME_LIGHT = "light";
  const sunIcon = `<svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM11 1h2v3h-2V1Zm11 10h3v2h-3v-2ZM11 20h2v3h-2v-3ZM3.54 4.95l1.41-1.41 2.12 2.12-1.41 1.41L3.54 4.95Zm15.51 15.51-1.41-1.41-2.12 2.12 1.41 1.41 2.12-2.12ZM2 11h3v2H2v-2Zm17.05 6.46-1.41 1.41-2.12-2.12 1.41-1.41 2.12 2.12ZM4.95 19.05l1.41 1.41 2.12-2.12-1.41-1.41-2.12 2.12Z"/></svg>`;
  const moonIcon = `<svg fill="currentColor" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36A5.5 5.5 0 0 1 12 15.5 5.5 5.5 0 0 1 6.5 10c0-1.93 1-3.62 2.5-4.63A9 9 0 0 0 3 12a9 9 0 0 0 9-9Z"/></svg>`;

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    toggle.innerHTML = theme === THEME_DARK ? sunIcon : moonIcon;
    localStorage.setItem(THEME_KEY, theme);
  };

  let currentTheme = localStorage.getItem(THEME_KEY);
  if (!currentTheme) {
    currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? THEME_DARK : THEME_LIGHT;
  }

  applyTheme(currentTheme);

  toggle.addEventListener("click", () => {
    const newTheme = document.documentElement.getAttribute("data-theme") === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    applyTheme(newTheme);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initReveal();
  initFaq();
  initPortfolioFilters();
  initWhatsAppLinks();
  initContactForm();
  initThemeToggle();
});
