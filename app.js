const body = document.querySelector("body");
const toggleBall = document.querySelector(".toggle-ball");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector(".primary-navigation");

function setTheme() {
    body.classList.toggle("dark-mode");
    toggleBall.classList.toggle("active");
};

window.addEventListener("click", (e) => {
    if (e.target.closest(".theme-toggle")) {
        setTheme();
    }

    if (e.target.closest(".menu-toggle")) {
        primaryNavigation.classList.toggle("active");
    }

    if (!e.target.matches(".primary-navigation") && !e.target.closest(".navbar")) {
        primaryNavigation.classList.remove("active");
    }
});
