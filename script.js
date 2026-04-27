// Array to store task objects
let tasks = [];
let taskId = 1;

const taskForm = document.getElementById("taskForm");
const taskmanager = document.getElementById("taskmanager");

taskForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const taskName = document.getElementById("taskName").value.trim();
  const priority = document.getElementById("priority").value;
  const isImportant = document.getElementById("important").checked;
  const isCompleted = document.getElementById("completed").checked;

  if (taskName === "") {
    alert("Please enter a task name.");
    return;
  }

  const today = new Date().toLocaleDateString();

  const task = {
    id: taskId,
    name: taskName,
    priority: priority,
    isImportant: isImportant,
    isCompleted: isCompleted,
    date: today
  };

  tasks.push(task);
  taskId++;

  console.log(JSON.stringify(tasks));

  displayTasks();
  taskForm.reset();
});

function displayTasks() {
  taskmanager.innerHTML = "";

  if (tasks.length === 0) {
    taskmanager.innerHTML = "<p>No tasks yet. Add your first task above.</p>";
    return;
  }

  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3
  };

  tasks.sort(function(a, b) {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  taskmanager.innerHTML = `<h2>Total Tasks: ${tasks.length}</h2>`;

  tasks.forEach(function(task) {
    taskmanager.innerHTML += `
      <div class="task" id="task-${task.id}">
        <h3>${task.name}</h3>
        <p>Priority: ${task.priority}</p>
        <p>Important: ${task.isImportant}</p>
        <p>Completed: ${task.isCompleted}</p>
        <p>Date Added: ${task.date}</p>
        <button onclick="toggleCompleted(${task.id})">Toggle Completed</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
  });

  applyTaskStyles();
}

function applyTaskStyles() {
  tasks.forEach(function(task) {
    const taskDiv = document.getElementById(`task-${task.id}`);

    if (task.priority === "High") {
      taskDiv.style.borderLeftColor = "red";
    } else if (task.priority === "Medium") {
      taskDiv.style.borderLeftColor = "orange";
    } else {
      taskDiv.style.borderLeftColor = "green";
    }

    if (task.isImportant) {
      taskDiv.style.backgroundColor = "#ffe5e5";
      taskDiv.style.color = "red";
    }

    if (task.isCompleted) {
      taskDiv.style.textDecoration = "line-through";
      taskDiv.style.opacity = "0.7";
    }
  });
}

function toggleCompleted(id) {
  tasks.forEach(function(task) {
    if (task.id === id) {
      task.isCompleted = !task.isCompleted;
    }
  });

  console.log(JSON.stringify(tasks));
  displayTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(function(task) {
    return task.id !== id;
  });

  console.log(JSON.stringify(tasks));
  displayTasks();
}