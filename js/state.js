// ===========================================
// Adaptive Task Manager
// State Management
// Version: 0.2.0
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
    }
};