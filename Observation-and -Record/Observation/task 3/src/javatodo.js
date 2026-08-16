
// Select DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

// Function to update empty message
function updateEmptyMessage() {
    if (taskList.children.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}

// Add task when button is clicked
addTaskButton.addEventListener("click", function () {

    const taskText = taskInput.value.trim();

    // Check if input is empty
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create list item
    const li = document.createElement("li");

    // Create task text
    const span = document.createElement("span");
    span.textContent = taskText;
    span.classList.add("task-text");

    // Create Complete button
    const completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.classList.add("complete-btn");

    // Create Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    // Complete button event listener
    completeButton.addEventListener("click", function () {
        span.classList.toggle("completed");

        if (span.classList.contains("completed")) {
            completeButton.textContent = "Completed";
        } else {
            completeButton.textContent = "Complete";
        }
    });

    // Delete button event listener
    deleteButton.addEventListener("click", function () {
        li.remove();
        updateEmptyMessage();
    });

    // Add elements to list item
    li.appendChild(span);
    li.appendChild(completeButton);
    li.appendChild(deleteButton);

    // Add list item to task list
    taskList.appendChild(li);

    // Clear input box
    taskInput.value = "";

    // Update empty message
    updateEmptyMessage();
});

// Display initial empty message
updateEmptyMessage();
