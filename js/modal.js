// ===========================================
// Adaptive Task Manager
// Modal Module
// Version: v0.4.2.2
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

let pendingDeleteTaskId = null;

// ===========================================
// COMPLETE CONFIRMATION MODAL
// ===========================================

const completeModal = document.getElementById("completeModal");
const completeTaskTitle = document.getElementById("completeTaskTitle");

const cancelCompleteButton = document.getElementById("cancelComplete");
const confirmCompleteButton = document.getElementById("confirmComplete");

let pendingCompleteTaskId = null;

// ===========================================
// FINISH TODAY MODAL
// ===========================================

const finishTodayModal = document.getElementById("finishTodayModal");

const cancelFinishButton = document.getElementById("cancelFinish");
const confirmFinishButton = document.getElementById("confirmFinish");

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

    AppState.editingTaskId = null;

    document.getElementById("taskModalTitle").textContent = "Add New Task";

    saveTaskButton.textContent = "Save Task";

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

    const taskData = {

        title: title,
        category: taskCategoryInput.value,
        priority: taskPriorityInput.value,
        dueDate: taskDateInput.value

    };

    if (AppState.editingTaskId) {

        updateTask(AppState.editingTaskId, taskData);

        renderUI();

        showToast("✅ Task updated successfully", "success");

    } else {

        addTask(taskData);

        renderUI();

        showToast("✅ Task added successfully", "success");

    }

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
// COMPLETE CONFIRMATION
// ===========================================

function openCompleteModal(taskId) {

    const task = AppState.tasks.find(task => task.id === taskId);

    if (!task) return;

    pendingCompleteTaskId = taskId;

    completeTaskTitle.textContent = `"${task.title}"`;

    completeModal.classList.add("show");

}

function closeCompleteModal() {

    pendingCompleteTaskId = null;

    completeModal.classList.remove("show");

}

function confirmCompleteTask() {

    if (!pendingCompleteTaskId) return;

    toggleTaskCompletion(pendingCompleteTaskId);

    renderUI();

    showToast("✅ Task completed", "success");

    closeCompleteModal();

}

// ===========================================
// FINISH TODAY
// ===========================================

function openFinishTodayModal() {

    finishTodayModal.classList.add("show");

}

function closeFinishTodayModal() {

    finishTodayModal.classList.remove("show");

}

function confirmFinishToday() {

    AppState.tasks = [];

    updateStats();

    saveTasks(AppState.tasks);

    renderUI();

    showToast(
        "🌅 Great work! Ready for tomorrow.",
        "success"
    );

    closeFinishTodayModal();

}

// ===========================================
// INITIALIZE MODAL
// ===========================================

function initializeModal() {

    // Add Task

    openModalButton.addEventListener("click", openTaskModal);

    closeModalButton.addEventListener("click", closeTaskModal);

    saveTaskButton.addEventListener("click", handleSaveTask);

    // Delete

    cancelDeleteButton.addEventListener("click", closeDeleteModal);

    confirmDeleteButton.addEventListener("click", confirmDeleteTask);

    // Complete

    cancelCompleteButton.addEventListener("click", closeCompleteModal);

    confirmCompleteButton.addEventListener("click", confirmCompleteTask);

    // Finish Today

    cancelFinishButton.addEventListener("click", closeFinishTodayModal);

    confirmFinishButton.addEventListener("click", confirmFinishToday);

    // Outside Click

    window.addEventListener("click", function (event) {

        if (event.target === modal) closeTaskModal();

        if (event.target === deleteModal) closeDeleteModal();

        if (event.target === completeModal) closeCompleteModal();

        if (event.target === finishTodayModal) closeFinishTodayModal();

    });

    // Keyboard

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            if (modal.classList.contains("show"))
                closeTaskModal();

            if (deleteModal.classList.contains("show"))
                closeDeleteModal();

            if (completeModal.classList.contains("show"))
                closeCompleteModal();

            if (finishTodayModal.classList.contains("show"))
                closeFinishTodayModal();

        }

        if (
            event.key === "Enter" &&
            modal.classList.contains("show")
        ) {

            event.preventDefault();

            handleSaveTask();

        }

    });

}