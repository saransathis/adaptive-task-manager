// ===========================================
// Adaptive Task Manager
// Local Storage Module
// Version: 0.2.0
// ===========================================

const STORAGE_KEY = "adaptiveTaskManagerTasks";

/**
 * Save tasks to Local Storage
 * @param {Array} tasks
 */
function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Load tasks from Local Storage
 * @returns {Array}
 */
function loadTasks() {
    const storedTasks = localStorage.getItem(STORAGE_KEY);

    if (!storedTasks) {
        return [];
    }

    try {
        return JSON.parse(storedTasks);
    } catch (error) {
        console.error("Error loading tasks from Local Storage:", error);
        return [];
    }
}

/**
 * Remove all stored tasks
 */
function clearTasks() {
    localStorage.removeItem(STORAGE_KEY);
}