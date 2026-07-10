// ===========================================
// Adaptive Task Manager
// State Management
// Version: v0.3.1
// ===========================================

const AppState = {
    tasks: [],

    filters: {
        category: "All",
        priority: "All",
        search: ""
    },

    stats: {
        total: 0,
        pending: 0,
        completed: 0
    },

    // ===========================================
    // Edit Task State
    // ===========================================

    editingTaskId: null
};