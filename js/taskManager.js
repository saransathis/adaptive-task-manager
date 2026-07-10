// ===========================================
// Adaptive Task Manager
// Task Manager Module
// Version : v0.3.0.1
// ===========================================

// ===========================================
// SEARCH
// ===========================================

const taskSearch = document.getElementById("taskSearch");

let currentSearch = "";

// ===========================================
// FILTER TASKS
// ===========================================

function getFilteredTasks() {

    let filteredTasks = [...AppState.tasks];

    if (currentSearch.trim() !== "") {

        filteredTasks = filteredTasks.filter(task =>

            task.title
                .toLowerCase()
                .includes(currentSearch.toLowerCase())

        );

    }

    return filteredTasks;

}

// ===========================================
// SEARCH LISTENER
// ===========================================

function initializeSearch() {

    if (!taskSearch) return;

    taskSearch.addEventListener("input", function () {

        currentSearch = this.value;

        renderUI();

    });

}

// ===========================================
// INITIALIZE
// ===========================================

document.addEventListener("DOMContentLoaded", () => {

    initializeSearch();

});