const body = document.querySelector("body");
const subscribeBtn = document.querySelector(".btn-sub");
const toggleBall = document.querySelector(".toggle-ball");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector(".primary-navigation");
const backdrop = document.querySelector(".backdrop");
const modal = document.getElementById('sub-modal');

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
};

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