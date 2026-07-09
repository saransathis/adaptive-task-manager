// ===========================================
// Adaptive Task Manager
// Task Management Module
// Version: 0.2.0
// ===========================================

/**
 * Generate a unique task ID
 * @returns {string}
 */
function generateTaskId() {
    return `task-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

/**
 * Update dashboard statistics
 */
function updateStats() {
    AppState.stats.total = AppState.tasks.length;

    AppState.stats.completed = AppState.tasks.filter(
        task => task.completed
    ).length;

    AppState.stats.pending =
        AppState.stats.total - AppState.stats.completed;
}

/**
 * Add a new task
 * @param {Object} taskData
 */
function addTask(taskData) {
    const newTask = {
        id: generateTaskId(),
        title: taskData.title,
        category: taskData.category,
        priority: taskData.priority,
        dueDate: taskData.dueDate,
        completed: false,
        createdAt: new Date().toISOString()
    };

    AppState.tasks.push(newTask);

    updateStats();
    saveTasks(AppState.tasks);
}

/**
 * Delete a task
 * @param {string} taskId
 */
function deleteTask(taskId) {
    AppState.tasks = AppState.tasks.filter(
        task => task.id !== taskId
    );

    updateStats();
    saveTasks(AppState.tasks);
}

/**
 * Toggle task completion
 * @param {string} taskId
 */
function toggleTaskCompletion(taskId) {
    const task = AppState.tasks.find(
        task => task.id === taskId
    );

    if (!task) return;

    task.completed = !task.completed;

    updateStats();
    saveTasks(AppState.tasks);
}

/**
 * Load tasks from Local Storage
 */
function initializeTasks() {
    AppState.tasks = loadTasks();
    updateStats();
}