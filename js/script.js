const header = document.querySelector(".site-header");
const navbar = document.querySelector(".navbar");
const navToggle = document.querySelector(".nav-toggle");
const revealItems = document.querySelectorAll(".reveal");
const parallaxCards = document.querySelectorAll(".parallax-card");
const faqItems = document.querySelectorAll(".faq-item");
const yearTargets = document.querySelectorAll(".js-year");

if (navToggle && navbar) {
  navToggle.addEventListener("click", () => {
    navbar.classList.toggle("nav-open");
  });

  document.querySelectorAll(".nav-panel a").forEach((link) => {
    link.addEventListener("click", () => navbar.classList.remove("nav-open"));
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");
  if (!button) return;

  button.addEventListener("click", () => {
    const isActive = item.classList.contains("active");
    faqItems.forEach((faq) => faq.classList.remove("active"));
    if (!isActive) {
      item.classList.add("active");
    }
  });
});

yearTargets.forEach((target) => {
  target.textContent = new Date().getFullYear();
});

const updateScrollState = () => {
  const y = window.scrollY;

  if (header) {
    header.classList.toggle("scrolled", y > 24);
  }

  parallaxCards.forEach((card, index) => {
    const speed = (index + 1) * 0.015;
    card.style.setProperty("--parallax-offset", `${y * speed}px`);
  });
};

updateScrollState();
window.addEventListener("scroll", updateScrollState, { passive: true });
