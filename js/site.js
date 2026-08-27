const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navigation = document.querySelector("[data-navigation]");

const closeNavigation = () => {
  if (!navToggle || !navigation) return;
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.querySelector(".sr-only").textContent = "Open navigation";
  navigation.classList.remove("is-open");
  document.body.classList.remove("nav-open");
};

if (navToggle && navigation) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.querySelector(".sr-only").textContent = isOpen ? "Open navigation" : "Close navigation";
    navigation.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeNavigation();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
      closeNavigation();
      navToggle.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeNavigation();
  });
}

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
