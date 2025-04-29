const body = document.querySelector("body");
const subscribeBtn = document.querySelector(".btn-sub");
const toggleBall = document.querySelector(".toggle-ball");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector(".primary-navigation");
const backdrop = document.querySelector(".backdrop");
const modal = document.getElementById('sub-modal');
const modelVarients = document.querySelectorAll(".model-name");
const expand = document.querySelectorAll(".expand");
const rightArrow = document.querySelectorAll(".right-arrow");
const varientList = document.querySelectorAll(".model-varients-list");

// Function to handle expanding Model List 
modelVarients.forEach((itm, idx) => {
    itm.addEventListener("click", () => {
        expand[idx].classList.toggle("active");
        rightArrow[idx].classList.toggle("active");
        varientList[idx].classList.toggle("active");
    });
})

// Variables for assigning First and Last focus child
let firstFocusChild;
let lastFocusChild;
let isModalOpen = false;

// Function for setting Focus child
function setFocusChilds(container, elements) {
    let Children = container.querySelectorAll(elements);
    firstFocusChild = Children[0];
    lastFocusChild = Children[Children.length - 1];
}

// Function to Trap Focus between First and Last child
function trapFocus(event) {
    if (event.key === "Tab") {
        if (event.shiftKey) {
            if (document.activeElement === firstFocusChild) {
                event.preventDefault();
                lastFocusChild.focus();
            }
        }
        else {
            if (document.activeElement === lastFocusChild) {
                event.preventDefault();
                firstFocusChild.focus();
            }
        }
    }
}

function setTheme() {
    body.classList.toggle("dark-mode");
    toggleBall.classList.toggle("active");

    // Saves the theme state in local storage
    const isThemeDark = body.classList.contains("dark-mode");
    localStorage.setItem("theme", isThemeDark ? "dark" : "light");
};

// Helper function to Toggl theme between light and dark based on a boolean flag
function toggleTheme(flag) {
    if (flag) {
        body.classList.add("dark-mode");
        toggleBall.classList.add("active");
    }
    else {
        body.classList.remove("dark-mode");
        toggleBall.classList.remove("active");
    }
}

// Function to load theme based on user's System Preference and to override it based on user's choice 
function setThemeOnLoad() {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        toggleTheme(true);
    }
    else if (savedTheme === "light") {
        toggleTheme(false);
    }
    else if(prefersDark) {
        toggleTheme(true);
    }
};

// Event Listener to check and match system theme without having to reload the site
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
    if (!localStorage.getItem("theme")) {
        toggleTheme(e.matches);
    }
});

window.addEventListener("DOMContentLoaded", setThemeOnLoad);

window.addEventListener("click", (e) => {
    let modalRect = modal.getBoundingClientRect();
    let navMenuRect = primaryNavigation.getBoundingClientRect();

    if (e.target == subscribeBtn) {
        modal.showModal();
        subscribeBtn.setAttribute("aria-expanded", "true");
        isModalOpen = true;
        setFocusChilds(modal, "button, input");
        body.style.overflow = "hidden";
        return;
    }

    if (e.target.closest("#close-modal") || e.clientX < modalRect.left) {
        modal.close();
        subscribeBtn.setAttribute("aria-expanded", "false");
        isModalOpen = false;
        body.style.overflow = "auto";
        return;
    }

    if (e.target.closest(".theme-toggle")) {
        setTheme();
        let isPressed = e.target.getAttribute("aria-pressed") == "true";
        e.target.setAttribute("aria-pressed", !isPressed ? "true" : "false");
        return;
    }

    if (e.target.closest(".menu-toggle")) {
        backdrop.classList.add("active");
        primaryNavigation.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
        primaryNavigation.querySelector(".menu-close-btn").focus();
        setFocusChilds(primaryNavigation, "button, a, input");
        body.style.overflow = "hidden";
        return;
    }

    if (e.target.closest(".menu-close-btn") || e.clientX < navMenuRect.left) {
        if (primaryNavigation.classList.contains("active")) {
            backdrop.classList.remove("active");
            primaryNavigation.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.focus();
            body.style.overflow = "auto";
        }
        return;
    }
});

// Event Listener to handle Tab key event
window.addEventListener('keydown', e => {
    if (primaryNavigation.classList.contains("active") || isModalOpen) {
        trapFocus(e);
    }
})