// ===========================================
// Adaptive Task Manager
// Application Entry Point
// Version: 0.2.0
// ===========================================

/**
 * Initialize the application
 */
function initializeApp() {

    // Load tasks from Local Storage
    initializeTasks();

    // Register UI event listeners
    initializeUI();

    // Register modal event listeners
    initializeModal();

    // Render the application
    renderUI();
}

// Start the application
document.addEventListener("DOMContentLoaded", initializeApp);