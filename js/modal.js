// ===========================================
// Adaptive Task Manager
// Modal Module
// Version: 0.2.0
// ===========================================

const modal = document.getElementById("taskModal");

const openModalButton = document.getElementById("openModal");
const closeModalButton = document.getElementById("closeModal");
const saveTaskButton = document.getElementById("saveTask");

const taskTitleInput = document.getElementById("taskTitle");
const taskCategoryInput = document.getElementById("taskCategory");
const taskPriorityInput = document.getElementById("taskPriority");
const taskDateInput = document.getElementById("taskDate");

/**
 * Open task modal
 */
function openTaskModal() {
    modal.style.display = "flex";
    taskTitleInput.focus();
}

/**
 * Close task modal
 */
function closeTaskModal() {
    modal.style.display = "none";
    resetTaskForm();
}

/**
 * Reset form fields
 */
function resetTaskForm() {
    taskTitleInput.value = "";
    taskCategoryInput.selectedIndex = 0;
    taskPriorityInput.selectedIndex = 0;
    taskDateInput.value = "";
}

/**
 * Save task from form
 */
function handleSaveTask() {

    const title = taskTitleInput.value.trim();

    if (title === "") {
        alert("Please enter a task title.");
        taskTitleInput.focus();
        return;
    }

    addTask({
        title: title,
        category: taskCategoryInput.value,
        priority: taskPriorityInput.value,
        dueDate: taskDateInput.value
    });

    renderUI();
    closeTaskModal();
}

/**
 * Register modal events
 */
function initializeModal() {

    openModalButton.addEventListener("click", openTaskModal);

    closeModalButton.addEventListener("click", closeTaskModal);

    saveTaskButton.addEventListener("click", handleSaveTask);

    // Close when clicking outside the modal
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeTaskModal();
        }
    });

    // Press Escape to close
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal.style.display === "flex") {
            closeTaskModal();
        }
    });
}