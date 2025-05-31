
// Set active class based on current URL
document.addEventListener("DOMContentLoaded", () => {
  const helperLinks = document.querySelectorAll(".tab-link");
  helperLinks.forEach((link) => {
    if (window.location.pathname === link.getAttribute("href")) {
      link.classList.add("active");
    }
    link.addEventListener("click", () => {
      helperLinks.forEach((lnk) => lnk.classList.remove("active"));
      link.classList.add("active");
    });
  });
});
