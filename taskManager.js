// DOM Elements
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskPriority = document.getElementById("taskPriority");
const taskList = document.getElementById("taskList");

// Tasks Array
let tasks = [];

// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", () => {
  tasks = loadTasks();
  renderTasks();
});

// Add Task
const addTask = (title, description, priority) => {
  const newTask = {
    id: Date.now(), // Unique ID using timestamp
    title,
    description,
    priority,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();
};

// Delete Task
const deleteTask = (taskId) => {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasks();
  renderTasks();
};

// Update Task
const updateTask = (taskId, updates) => {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, ...updates } : task
  );
  saveTasks();
  renderTasks();
};

// Toggle Task Completion
const toggleTaskCompletion = (taskId) => {
  tasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
};

// Save tasks to localStorage
const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Load tasks from localStorage
const loadTasks = () => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
};

// Render Tasks
const renderTasks = () => {
  taskList.innerHTML = ""; // Clear task list

  tasks.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.className = `task-item ${task.completed ? "task-completed" : ""}`;

    taskItem.innerHTML = `
      <div>
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <span>Priority: ${task.priority}</span>
      </div>
      <div class="task-actions">
        <button class="complete-btn" onclick="toggleTaskCompletion(${task.id})">
          ${task.completed ? "Undo" : "Complete"}
        </button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">
          Delete
        </button>
      </div>
    `;

    taskList.appendChild(taskItem);
  });
};

// Handle form submission
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = taskTitle.value.trim();
  const description = taskDescription.value.trim();
  const priority = taskPriority.value;

  if (!title || !description) {
    alert("Task title and description are required!");
    return;
  }

  addTask(title, description, priority);

  // Reset form
  taskForm.reset();
});

// Bonus Features
// Filter Tasks by Priority
const filterTasks = (priority) => {
  const filteredTasks = tasks.filter((task) => task.priority === priority);
  renderFilteredTasks(filteredTasks);
};

const renderFilteredTasks = (filteredTasks) => {
  taskList.innerHTML = "";

  filteredTasks.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.className = `task-item ${task.completed ? "task-completed" : ""}`;

    taskItem.innerHTML = `
      <div>
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <span>Priority: ${task.priority}</span>
      </div>
      <div class="task-actions">
        <button class="complete-btn" onclick="toggleTaskCompletion(${task.id})">
          ${task.completed ? "Undo" : "Complete"}
        </button>
        <button class="delete-btn" onclick="deleteTask(${task.id})">
          Delete
        </button>
      </div>
    `;

    taskList.appendChild(taskItem);
  });
};

// Search Tasks
const searchTasks = (query) => {
  const searchedTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(query.toLowerCase())
  );
  renderFilteredTasks(searchedTasks);
};
