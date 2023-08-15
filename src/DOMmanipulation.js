import {
  getTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "./localStorage";
import {
  todo,
  getTodayTasks,
  getUpcomingWeekTasks,
  deleteTask,
  findTaskById
} from "./todo";

let id = 0;
let tasks = localStorage.getItem("tasks") ? getTasksFromLocalStorage() : [];

function createTaskContainer(task) {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");
  taskContainer.id = task.id;

  const taskContainerTitle = document.createElement("p");
  taskContainerTitle.classList.add("task-container-title");
  taskContainerTitle.textContent = `Task: ${task.title}`;

  const taskContainerDescription = document.createElement("p");
  taskContainerDescription.classList.add("task-container-description");
  taskContainerDescription.textContent = `Description: ${task.description}`;

  const taskContainerDate = document.createElement("p");
  taskContainerDate.classList.add("task-container-date");
  taskContainerDate.textContent = `Due date: ${formatDate(task.dueDate)}`;

  const taskContainerPriority = document.createElement("p");
  taskContainerPriority.classList.add("task-container-priority");
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
  const showTasks = document.querySelector(".show-tasks");

  const itemId = id;
  id++;
  const formTaskTitle = document.querySelector("#task-title").value;
  const formTaskDescription = document.querySelector("#task-description").value;
  const formTaskDueDate = document.querySelector("#task-duedate").value;
  const formTaskPriority = document.querySelector(
    'input[type="radio"]:checked'
  ).value;

  //creates the new task using info provided in the form
  const task = todo(
    itemId,
    formTaskTitle,
    formTaskDescription,
    formTaskDueDate,
    formTaskPriority
  );

  //adds task to task list and updates the active tasks on the DOM
  tasks.push(task);
  saveTasksToLocalStorage(tasks);
  showTasks.appendChild(createTaskContainer(task));
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
  getTodayTasks();
}

function showUpcomingTasks() {
  getUpcomingWeekTasks();
}

function showAllTasks() {
  const showTasks = document.querySelector(".show-tasks");
  tasks.forEach((task) => {
    showTasks.appendChild(createTaskContainer(task));
  });
}

function removeTask(e) {
  const taskContainers = document.querySelectorAll(".task-container");
  let taskContainersList = Array.from(taskContainers);
  const taskId = e.target.parentNode.id;
  let selectedTaskContainer = findTaskById(taskContainersList, taskId);

  //remove the task from DOM
  e.target.parentNode.remove();
  taskContainersList = taskContainersList.filter(
    (taskContainer) => taskContainer != selectedTaskContainer
  );

  //remove the task from the task array
  deleteTask(tasks, taskId);
  //re-stringify the array after removing the task
  saveTasksToLocalStorage(tasks);
}



function taskContainerEvent(e) {
  const deleteButton = e.target.matches(".delete-btn");
  const timeToday = e.target.matches("#time-today");
  const timeAll = e.target.matches("#time-all");
  const timeUpcoming = e.target.matches("#time-upcoming");

  if (deleteButton) {
    removeTask(e);
  } else if (timeToday) {
    clearScreen();
    showTodayTasks();
  } else if (timeAll) {
    clearScreen();
    showAllTasks();
  } else if (timeUpcoming) {
    clearScreen();
    showUpcomingTasks();
  } else return;
}

function pageEvent() {
  const taskContainer = document.querySelector(".container");
  taskContainer.addEventListener("click", taskContainerEvent);
}

function clearScreen() {
  const showTasks = document.querySelector(".show-tasks");
  showTasks.textContent = "";
}

export {
  createTaskContainer,
  addNewTask,
  handleFormSubmit,
  showAllTasks,
  showUpcomingTasks,
  removeTask,
  pageEvent,
};
