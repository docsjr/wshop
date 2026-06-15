const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const floatingCta = document.querySelector("[data-floating-cta]");
const revealElements = document.querySelectorAll(".reveal");
const faqQuestions = document.querySelectorAll(".faq-question");

function updateHeaderState() {
  if (!header) return;

  const isScrolled = window.scrollY > 12;
  header.classList.toggle("is-scrolled", isScrolled);
}

function updateFloatingCta() {
  if (!floatingCta) return;

  const shouldShow = window.scrollY > 520;
  floatingCta.classList.toggle("is-visible", shouldShow);
}

function closeMobileNav() {
  if (!navToggle || !nav) return;

  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Abrir menu");
  nav.classList.remove("is-open");
  document.body.classList.remove("nav-open");
}

function toggleMobileNav() {
  if (!navToggle || !nav) return;

  const isOpen = navToggle.getAttribute("aria-expanded") === "true";

  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
  nav.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("nav-open", !isOpen);
}

function initializeNavigation() {
  if (!navToggle || !nav) return;

  navToggle.addEventListener("click", toggleMobileNav);

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileNav();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      closeMobileNav();
    }
  });
}

function initializeRevealAnimations() {
  if (!revealElements.length) return;

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -60px 0px"
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });
}

function setFaqAnswerHeight(question, isExpanded) {
  const answer = question.nextElementSibling;

  if (!answer) return;

  if (isExpanded) {
    answer.style.maxHeight = `${answer.scrollHeight}px`;
  } else {
    answer.style.maxHeight = "0px";
  }
}

function initializeFaqAccordion() {
  if (!faqQuestions.length) return;

  faqQuestions.forEach((question) => {
    const isInitiallyExpanded = question.getAttribute("aria-expanded") === "true";
    setFaqAnswerHeight(question, isInitiallyExpanded);

    question.addEventListener("click", () => {
      const isExpanded = question.getAttribute("aria-expanded") === "true";
      const nextState = !isExpanded;

      question.setAttribute("aria-expanded", String(nextState));
      setFaqAnswerHeight(question, nextState);
    });
  });

  window.addEventListener("resize", () => {
    faqQuestions.forEach((question) => {
      const isExpanded = question.getAttribute("aria-expanded") === "true";
      setFaqAnswerHeight(question, isExpanded);
    });
  });
}

function initializeScrollEffects() {
  updateHeaderState();
  updateFloatingCta();

  window.addEventListener(
    "scroll",
    () => {
      updateHeaderState();
      updateFloatingCta();
    },
    { passive: true }
  );
}

function initializeLandingPage() {
  initializeNavigation();
  initializeRevealAnimations();
  initializeFaqAccordion();
  initializeScrollEffects();
}

document.addEventListener("DOMContentLoaded", initializeLandingPage);