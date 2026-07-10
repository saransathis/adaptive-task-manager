// ===========================================
// Adaptive Task Manager
// UI Module
// Version: 0.2.2
// ===========================================

// ===========================================
// DOM REFERENCES
// ===========================================

const taskContainer = document.getElementById("taskContainer");

const totalTasksElement = document.getElementById("totalTasks");
const pendingTasksElement = document.getElementById("pendingTasks");
const completedTasksElement = document.getElementById("completedTasks");

const toastContainer = document.getElementById("toastContainer");

const taskModal = document.getElementById("taskModal");

const taskModalTitle = document.getElementById("taskModalTitle");




// ===========================================
// TOAST NOTIFICATIONS
// ===========================================

function showToast(message, type = "success") {

    if (!toastContainer) return;

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    toast.textContent = message;

    toastContainer.appendChild(toast);

    setTimeout(() => {

        toast.classList.add("hide");

        toast.addEventListener("animationend", () => {

            toast.remove();

        });

    }, 3000);

}

// ===========================================
// DASHBOARD
// ===========================================

function renderStats() {

    totalTasksElement.textContent = AppState.stats.total;
    pendingTasksElement.textContent = AppState.stats.pending;
    completedTasksElement.textContent = AppState.stats.completed;

}

// ===========================================
// DATE HELPERS
// ===========================================

function formatDueDate(dateString) {

    if (!dateString) {

        return "No Due Date";

    }

    const today = new Date();
    const dueDate = new Date(dateString);

    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const difference = Math.round(

        (dueDate - today) /

        (1000 * 60 * 60 * 24)

    );

    if (difference === 0) return "Today";
    if (difference === 1) return "Tomorrow";
    if (difference === -1) return "Yesterday";

    return dueDate.toLocaleDateString(undefined, {

        month: "short",
        day: "numeric",
        year: "numeric"

    });

}

// ===========================================
// PRIORITY HELPERS
// ===========================================

function getPriorityClass(priority) {

    switch (priority.toLowerCase()) {

        case "high":
            return "priority-high";

        case "medium":
            return "priority-medium";

        default:
            return "priority-low";

    }

}

function getPriorityIcon(priority) {

    switch (priority.toLowerCase()) {

        case "high":
            return "🔴";

        case "medium":
            return "🟡";

        default:
            return "🟢";

    }

}

// ===========================================
// TASK CARD
// ===========================================

function createTaskCard(task) {

    const card = document.createElement("div");

    card.className = task.completed
        ? "task-card completed"
        : "task-card";

    card.dataset.id = task.id;

    card.innerHTML = `

        <div class="task-left">

            <div class="task-title">
                ${task.title}
            </div>

            <div class="task-meta">

                <span class="badge ${getPriorityClass(task.priority)}">
                    ${getPriorityIcon(task.priority)} ${task.priority}
                </span>

                <span class="badge">
                    📁 ${task.category}
                </span>

                <span class="badge">
                    📅 ${formatDueDate(task.dueDate)}
                </span>

                ${task.completed
                    ? `
                    <span class="badge completed-badge">
                        ✓ Completed
                    </span>
                    `
                    : ""
                }

            </div>

        </div>

        <div class="task-actions">

    <button
        class="complete-btn"
        title="${task.completed ? "Undo Task" : "Complete Task"}">

        ${task.completed ? "↺" : "✓"}

    </button>

    <button
        class="edit-btn"
        title="Edit Task">

        ✏️

    </button>

    <button
        class="delete-btn"
        title="Delete Task">

        🗑

    </button>

</div>

    `;

    return card;

}
// ===========================================
// OPEN EDIT TASK MODAL
// ===========================================

function openEditTask(taskId) {

    const task = AppState.tasks.find(task => task.id === taskId);

    if (!task) return;

    AppState.editingTaskId = taskId;

    taskTitleInput.value = task.title;
    taskCategoryInput.value = task.category;
    taskPriorityInput.value = task.priority;
    taskDateInput.value = task.dueDate;

    taskModalTitle.textContent = "Edit Task";
    saveTaskButton.textContent = "Save Changes";

    taskModal.classList.add("show");

}

// ===========================================
// EMPTY STATE
// ===========================================

function renderEmptyState() {

    taskContainer.innerHTML = `

        <div class="empty-task">

            <div style="font-size:3rem;">
                📝
            </div>

            <h3>No Tasks Yet</h3>

            <p>
                Click the + button to create your first task.
            </p>

        </div>

    `;

}

// ===========================================
// RENDER TASKS
// ===========================================
function renderTasks() {

    taskContainer.innerHTML = "";

    let tasksToRender = AppState.tasks;

    // Use filtered tasks if Task Manager module is available
    if (typeof getFilteredTasks === "function") {

        tasksToRender = getFilteredTasks();

    }

    if (tasksToRender.length === 0) {

        renderEmptyState();

        return;

    }

    tasksToRender.forEach(task => {

        taskContainer.appendChild(

            createTaskCard(task)

        );

    });

}

// ===========================================
// MAIN RENDER
// ===========================================

function renderUI() {

    renderStats();

    renderTasks();

}

// ===========================================
// EVENT LISTENERS
// ===========================================

function initializeUI() {

    taskContainer.addEventListener("click", function (event) {

        const taskCard = event.target.closest(".task-card");

        if (!taskCard) return;

        const taskId = taskCard.dataset.id;

        // Complete / Undo

        if (event.target.closest(".complete-btn")) {

            const task = AppState.tasks.find(

                task => task.id === taskId

            );

            toggleTaskCompletion(taskId);

            if (task.completed) {

                showToast("✅ Task completed", "success");

            } else {

                showToast("ℹ️ Task marked as pending", "info");

            }

            renderUI();

            return;

        }
        // Edit Task

if (event.target.closest(".edit-btn")) {

    openEditTask(taskId);

    return;

}

        // Delete Confirmation

        if (event.target.closest(".delete-btn")) {

            openDeleteModal(taskId);

            return;

        }

    });

}