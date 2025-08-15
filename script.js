const inputBox = document.querySelector(".inputfield input");
const addBtn = document.querySelector(".inputfield button");
const list = document.querySelector(".list");
const completedList = document.querySelector(".completed-list");
const pendingNum = document.querySelector(".pendingNum");
const completedNum = document.querySelector(".completedNum");
const clearAllBtn = document.querySelector(".clear-all");
const clearCompletedBtn = document.querySelector(".clear-completed");

// Enable/disable add button based on input
inputBox.addEventListener("keyup", () => {
    let userData = inputBox.value.trim();
    addBtn.classList.toggle("active", userData.length !== 0);
});

// Initial load
showTasks();
showCompletedTasks();

// Add a task
addBtn.addEventListener("click", () => {
    let userData = inputBox.value.trim();
    if (userData === "") return;

    let listArr = getTasksFromLocalStorage();
    listArr.push(userData);
    updateLocalStorage(listArr);
    
    showTasks();
    inputBox.value = ""; // Clear input
});

// Retrieve tasks from local storage
function getTasksFromLocalStorage() {
    let storedTasks = localStorage.getItem("New Item");
    return storedTasks ? JSON.parse(storedTasks) : [];
}

// Retrieve completed tasks from local storage
function getCompletedTasksFromLocalStorage() {
    let storedCompleted = localStorage.getItem("Completed Items");
    return storedCompleted ? JSON.parse(storedCompleted) : [];
}

// Update tasks in local storage
function updateLocalStorage(listArr) {
    localStorage.setItem("New Item", JSON.stringify(listArr));
    updatePendingTasks(listArr.length);
}

// Update completed tasks in local storage
function updateCompletedLocalStorage(completedArr) {
    localStorage.setItem("Completed Items", JSON.stringify(completedArr));
}

// Update the pending tasks count
function updatePendingTasks(count) {
    pendingNum.textContent = count;
}

// Update the completed tasks count
function updateCompletedTasks(count) {
    completedNum.textContent = count;
}

// Display tasks in the list
function showTasks() {
    let listArr = getTasksFromLocalStorage();
    let newLiTag = '';

    listArr.forEach((task, index) => {
        newLiTag += `<li>${task}
            <span class="complete-btn" onclick="completeTask(${index})">
                <i class="fa-solid fa-trash"></i>
            </span>
        </li>`;
    });

    list.innerHTML = newLiTag;
    updatePendingTasks(listArr.length);
}

// Display completed tasks
function showCompletedTasks() {
    let completedArr = getCompletedTasksFromLocalStorage();
    let newCompletedLiTag = '';

    completedArr.forEach((task) => {
        newCompletedLiTag += `<li>${task}</li>`;
    });

    completedList.innerHTML = newCompletedLiTag;
    updateCompletedTasks(completedArr.length); // Update completed tasks count
}

// Move task to completed tasks instead of deleting
function completeTask(index) {
    let listArr = getTasksFromLocalStorage();
    let completedTasks = getCompletedTasksFromLocalStorage();

    let completedTask = listArr.splice(index, 1)[0]; // Remove from to-do list
    completedTasks.push(completedTask); // Add to completed tasks

    updateLocalStorage(listArr);
    updateCompletedLocalStorage(completedTasks);
    showTasks();
    showCompletedTasks();
}

// Clear all pending tasks
clearAllBtn.addEventListener("click", () => {
    updateLocalStorage([]);
    showTasks();
});

// Clear all completed tasks
clearCompletedBtn.addEventListener("click", () => {
    updateCompletedLocalStorage([]);
    showCompletedTasks();
});