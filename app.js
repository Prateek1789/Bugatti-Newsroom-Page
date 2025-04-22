const body = document.querySelector("body");
const toggleBall = document.querySelector(".toggle-ball");
const menuToggle = document.querySelector(".menu-toggle");
const menuClose = document.querySelector(".menu-close-btn");
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
        primaryNavigation.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
    }

    if (e.target.closest(".menu-close-btn")) {
        primaryNavigation.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    }
    
    if (!e.target.matches(".primary-navigation") && !e.target.closest(".navbar")) {
        // Close the menu if the user clicks outside of it
        if (primaryNavigation.classList.contains("active")) {
            primaryNavigation.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }
    }
});
