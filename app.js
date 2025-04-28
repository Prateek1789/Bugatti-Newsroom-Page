const body = document.querySelector("body");
const subscribeBtn = document.querySelector(".btn-sub");
const toggleBall = document.querySelector(".toggle-ball");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector(".primary-navigation");
const backdrop = document.querySelector(".backdrop");
const modal = document.getElementById('sub-modal');

function setTheme() {
    body.classList.toggle("dark-mode");
    toggleBall.classList.toggle("active");
};

window.addEventListener("click", (e) => {
    let modalRect = modal.getBoundingClientRect();
    let navMenuRect = primaryNavigation.getBoundingClientRect();

    if (e.target == subscribeBtn) {
        modal.showModal();
        subscribeBtn.setAttribute("aria-expanded", "true");
        return;
    }

    if (e.target.closest("#close-modal") || e.clientX < modalRect.left) {
        modal.close();
        subscribeBtn.setAttribute("aria-expanded", "false");
        return;
    }

    if (e.target.closest(".theme-toggle")) {
        setTheme();
        let isPressed = e.target.getAttribute("aria-pressed") == "true";
        e.target.setAttribute("aria-pressed", !isPressed ? "true" : "false");
        return;
    }

    if (e.target.closest(".menu-toggle")) {
        primaryNavigation.classList.add("active");
        primaryNavigation.querySelector(".menu-close-btn").focus();
        menuToggle.setAttribute("aria-expanded", "true");
        backdrop.classList.add("active");
        return;
    }

    if (e.target.closest(".menu-close-btn") || e.clientX < navMenuRect.left) {
        if (primaryNavigation.classList.contains("active")) {
            primaryNavigation.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            backdrop.classList.remove("active");
            menuToggle.focus();
        }
        return;
    }
});
