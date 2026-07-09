// ===========================================
// Adaptive Task Manager
// UI Module
// Version: 0.2.1
// ===========================================

const taskContainer = document.getElementById("taskContainer");

const totalTasksElement = document.getElementById("totalTasks");
const pendingTasksElement = document.getElementById("pendingTasks");
const completedTasksElement = document.getElementById("completedTasks");

/**
 * Render dashboard statistics
 */
function renderStats() {

    totalTasksElement.textContent = AppState.stats.total;
    pendingTasksElement.textContent = AppState.stats.pending;
    completedTasksElement.textContent = AppState.stats.completed;

}

/**
 * Convert date into a human-readable format.
 */
function formatDueDate(dateString) {

    if (!dateString) {
        return "No Due Date";
    }

    const today = new Date();
    const dueDate = new Date(dateString);

    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const difference =
        Math.round(
            (dueDate - today) /
            (1000 * 60 * 60 * 24)
        );

    if (difference === 0) {
        return "Today";
    }

    if (difference === 1) {
        return "Tomorrow";
    }

    if (difference === -1) {
        return "Yesterday";
    }

    return dueDate.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric"
    });

}

/**
 * Priority color class
 */
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

/**
 * Priority icon
 */
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

/**
 * Create a task card
 */
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
                class="delete-btn"
                title="Delete Task">

                🗑

            </button>

        </div>

    `;

    return card;

}
/**
 * Render empty state
 */
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

/**
 * Render all tasks
 */
function renderTasks() {

    taskContainer.innerHTML = "";

    if (AppState.tasks.length === 0) {

        renderEmptyState();
        return;

    }

    AppState.tasks.forEach(task => {

        taskContainer.appendChild(
            createTaskCard(task)
        );

    });

}

/**
 * Render complete UI
 */
function renderUI() {

    renderStats();
    renderTasks();

}

/**
 * Register UI events
 */
function initializeUI() {

    taskContainer.addEventListener("click", function (event) {

        const taskCard = event.target.closest(".task-card");

        if (!taskCard) {
            return;
        }

        const taskId = taskCard.dataset.id;

        if (event.target.closest(".complete-btn")) {

            toggleTaskCompletion(taskId);

            renderUI();

            return;

        }

        if (event.target.closest(".delete-btn")) {

            deleteTask(taskId);

            renderUI();

        }

    });

}