// ===========================================
// Adaptive Task Manager
// Application Entry Point
// Version: v0.4.2.3
// ===========================================

function initializeApp() {

    initializeTasks();

    loadTheme();

    initializeUI();

    initializeModal();

    renderUI();

}

// ===========================================
// Splash Screen
// ===========================================

document.addEventListener("DOMContentLoaded", () => {

    const splash = document.getElementById("splash-screen");

    setTimeout(() => {

        splash.classList.add("hide");

        initializeApp();

    }, 2000);

});