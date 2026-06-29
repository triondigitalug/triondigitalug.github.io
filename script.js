const WHATSAPP_NUMBER = "256755203456";
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
  const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`;
  const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`;
  
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
