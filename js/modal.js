// ===========================================
// Adaptive Task Manager
// Modal Module
// Version: v0.2.2
// ===========================================

// ===========================================
// ADD TASK MODAL
// ===========================================

const modal = document.getElementById("taskModal");

const openModalButton = document.getElementById("openModal");
const closeModalButton = document.getElementById("closeModal");
const saveTaskButton = document.getElementById("saveTask");

const taskTitleInput = document.getElementById("taskTitle");
const taskCategoryInput = document.getElementById("taskCategory");
const taskPriorityInput = document.getElementById("taskPriority");
const taskDateInput = document.getElementById("taskDate");

// ===========================================
// DELETE CONFIRMATION MODAL
// ===========================================

const deleteModal = document.getElementById("deleteModal");
const deleteTaskTitle = document.getElementById("deleteTaskTitle");

const cancelDeleteButton = document.getElementById("cancelDelete");
const confirmDeleteButton = document.getElementById("confirmDelete");

// Stores task id waiting for confirmation
let pendingDeleteTaskId = null;

// ===========================================
// OPEN ADD TASK MODAL
// ===========================================

function openTaskModal() {

    modal.classList.add("show");

    taskTitleInput.focus();

}

// ===========================================
// CLOSE ADD TASK MODAL
// ===========================================

function closeTaskModal() {

    modal.classList.remove("show");

    resetTaskForm();

}

// ===========================================
// RESET FORM
// ===========================================

function resetTaskForm() {

    taskTitleInput.value = "";
    taskCategoryInput.selectedIndex = 0;
    taskPriorityInput.selectedIndex = 0;
    taskDateInput.value = "";

}

// ===========================================
// SAVE TASK
// ===========================================

function handleSaveTask() {

    const title = taskTitleInput.value.trim();

    if (title === "") {

        showToast("Please enter a task title.", "error");

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

    showToast("✅ Task added successfully", "success");

    closeTaskModal();

}

// ===========================================
// DELETE CONFIRMATION
// ===========================================

function openDeleteModal(taskId) {

    const task = AppState.tasks.find(task => task.id === taskId);

    if (!task) return;

    pendingDeleteTaskId = taskId;

    deleteTaskTitle.textContent = `"${task.title}"`;

    deleteModal.classList.add("show");

}

function closeDeleteModal() {

    pendingDeleteTaskId = null;

    deleteModal.classList.remove("show");

}

function confirmDeleteTask() {

    if (!pendingDeleteTaskId) return;

    deleteTask(pendingDeleteTaskId);

    renderUI();

    showToast("🗑️ Task deleted successfully", "error");

    closeDeleteModal();

}

// ===========================================
// INITIALIZE MODAL
// ===========================================

function initializeModal() {

    // Add Task Modal

    openModalButton.addEventListener("click", openTaskModal);

    closeModalButton.addEventListener("click", closeTaskModal);

    saveTaskButton.addEventListener("click", handleSaveTask);

    // Delete Confirmation Modal

    cancelDeleteButton.addEventListener("click", closeDeleteModal);

    confirmDeleteButton.addEventListener("click", confirmDeleteTask);

    // Close when clicking outside modal

    window.addEventListener("click", function (event) {

        if (event.target === modal) {

            closeTaskModal();

        }

        if (event.target === deleteModal) {

            closeDeleteModal();

        }

    });

    // Keyboard Shortcuts

    document.addEventListener("keydown", function (event) {

        // ESC → Close Modals

        if (event.key === "Escape") {

            if (modal.classList.contains("show")) {

                closeTaskModal();

            }

            if (deleteModal.classList.contains("show")) {

                closeDeleteModal();

            }

        }

        // ENTER → Save Task

        if (
            event.key === "Enter" &&
            modal.classList.contains("show")
        ) {

            event.preventDefault();

            handleSaveTask();

        }

    });

}