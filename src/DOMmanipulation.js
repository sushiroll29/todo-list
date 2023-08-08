import {
  todo,
  addTaskToList,
  getTasks,
  getTodayTasks,
  getUpcomingWeekTasks,
  deleteTask,
  getTaskArrayLength,
} from "./todo";

function createTaskContainer(task) {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-card");
  taskContainer.id = getTaskArrayLength() - 1;

  const taskContainerTitle = document.createElement("p");
  taskContainerTitle.classList.add("task-card-title");
  taskContainerTitle.textContent = `Task: ${task.title}`;

  const taskContainerDescription = document.createElement("p");
  taskContainerDescription.classList.add("task-card-description");
  taskContainerDescription.textContent = `Description: ${task.description}`;

  const taskContainerDate = document.createElement("p");
  taskContainerDate.classList.add("task-card-date");
  taskContainerDate.textContent = `Due date: ${formatDate(task.dueDate)}`;

  const taskContainerPriority = document.createElement("p");
  taskContainerPriority.classList.add("task-card-priority");
  taskContainerPriority.textContent = `Priority: ${task.priority}`;

  const taskContainerDeleteBtn = document.createElement("button");
  taskContainerDeleteBtn.classList.add("delete-btn");
  taskContainerDeleteBtn.textContent = `Delete`;

  taskContainer.append(
    taskContainerTitle,
    taskContainerDescription,
    taskContainerDate,
    taskContainerPriority,
    taskContainerDeleteBtn
  );

  return taskContainer;
}

function addNewTask() {
  const newTaskBtn = document.querySelector("#new-task-btn");

  newTaskBtn.addEventListener("click", () => {
    openForm();
    form.addEventListener("submit", handleFormSubmit);
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  const container = document.querySelector(".container");

  const formTaskTitle = document.querySelector("#task-title").value;
  const formTaskDescription = document.querySelector("#task-description").value;
  const formTaskDueDate = document.querySelector("#task-duedate").value;
  const formTaskPriority = document.querySelector(
    'input[type="radio"]:checked'
  ).value;

  //creates the new task using info provided in the form
  const task = todo(
    formTaskTitle,
    formTaskDescription,
    formTaskDueDate,
    formTaskPriority
  );

  //adds task to task list and updates the active tasks on the DOM
  addTaskToList(task);
  console.log(getTasks());
  container.appendChild(createTaskContainer(task));
  closeForm();
}

function openForm() {
  const form = document.querySelector("#form");
  const formPopup = document.querySelector("#new-task-form");
  form.reset();
  formPopup.style.display = "block";
}

function closeForm() {
  const formPopup = document.querySelector("#new-task-form");
  const form = document.querySelector("#form");
  formPopup.style.display = "none";
  form.removeEventListener("submit", handleFormSubmit);
}

function formatDate(date) {
  return date.slice(0, 10).split("-").reverse().join("/");
}

function showTodayTasks() {
  const todayButton = document.querySelector("#time-today");
  todayButton.addEventListener("click", getTodayTasks);
}

function showUpcomingTasks() {
  const todayButton = document.querySelector("#time-upcoming");
  todayButton.addEventListener("click", getUpcomingWeekTasks);
}

function removeTask(e) {
  const taskContainers = document.querySelectorAll(".task-card");
  const taskContainersArr = Array.from(taskContainers);
  const taskId = e.target.parentNode.id;
  const tasks = getTasks();
  //remove task from task array
  deleteTask(tasks, taskId);
  //remove task container from container array
  deleteTask(taskContainersArr, taskId);
  //remove task from DOM
  e.target.parentNode.remove();
  //reassign new ids for the task containers based on their new positions in the container array
  taskContainersArr.map((taskContainer, i) => {
    taskContainer["id"] = i;
  });

  console.log(taskContainersArr);
  console.log(tasks);
}

function taskContainerEvent(e) {
  const deleteButton = e.target.matches(".delete-btn");

  if (deleteButton) {
    removeTask(e);
  }
}

function event() {
  const container = document.querySelector(".container");

  container.addEventListener("click", taskContainerEvent);
}

export {
  createTaskContainer,
  addNewTask,
  handleFormSubmit,
  showTodayTasks,
  showUpcomingTasks,
  removeTask,
  event,
};
