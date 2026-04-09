const header = document.querySelector(".site-header");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const yearTarget = document.getElementById("year");
const loader = document.getElementById("site-loader");

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

if (yearTarget) {
  yearTarget.textContent = String(new Date().getFullYear());
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    navLinks.classList.toggle("open");
  });

  navAnchors.forEach((anchor) => {
    anchor.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("open");
    });
  });
}

const onScroll = () => {
  if (header) {
    header.classList.toggle("scrolled", window.scrollY > 8);
  }
};

onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const sections = document.querySelectorAll("main section[id]");
const setActiveNav = () => {
  let current = "";
  const marker = window.scrollY + window.innerHeight * 0.28;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (marker >= sectionTop) {
      current = section.getAttribute("id") || "";
    }
  });

  navAnchors.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${current}`;
    link.classList.toggle("active", isActive);
  });
};

setActiveNav();
window.addEventListener("scroll", setActiveNav, { passive: true });

const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => revealObserver.observe(element));

window.addEventListener("load", () => {
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }

  if (loader) {
    loader.classList.add("hidden");
  }
});
