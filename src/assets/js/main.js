// Mobile menu
const toggle = document.querySelector(".nav-toggle");
if (toggle) {
  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("nav-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
}

// Once the featured event's day has passed, relabel it from "Upcoming" to
// "Recent" so the Home page never advertises a past date as coming up.
document.querySelectorAll("[data-event-date]").forEach((card) => {
  const [year, month, day] = card.dataset.eventDate.split("-").map(Number);
  if (new Date() >= new Date(year, month - 1, day + 1)) {
    const label = card.querySelector("[data-past]");
    if (label) label.textContent = label.dataset.past;
  }
});
