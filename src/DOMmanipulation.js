import {
  todo,
  addTaskToList,
  getTasks,
  getTodayTasks,
  getUpcomingWeekTasks,
  deleteTask,
  getTaskArrayLength,
} from "./todo";

let id = 0;

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
  addTaskToList(task);
  // console.log(getTasks());
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
  const todayButton = document.querySelector("#time-upcoming");
  todayButton.addEventListener("click", getUpcomingWeekTasks);
}

function showAllTasks() {
  let tasks = [];
  const showTasks = document.querySelector(".show-tasks");
  tasks = getTasks();
  tasks.forEach((task) => {
    showTasks.appendChild(createTaskContainer(task));
  });
}

function removeTask(e) {
  const taskContainers = document.querySelectorAll(".task-container");
  let taskContainersArr = Array.from(taskContainers);
  const taskId = e.target.parentNode.id;
  let tasks = getTasks();
  let selectedTask = findTaskById(tasks, taskId);
  let selectedTaskContainer = findTaskById(taskContainersArr, taskId);

  //remove the task from DOM
  e.target.parentNode.remove();
  taskContainersArr = taskContainersArr.filter(
    (taskContainer) => taskContainer != selectedTaskContainer
  );

  //remove the task form the task array
  deleteTask(taskId);

  // console.log(taskContainersArr);
  // console.log(tasks);
}

function findTaskById(array, taskId) {
  const selectedTask = array.find((task) => task["id"] == taskId);
  return selectedTask;
}

function taskContainerEvent(e) {
  const deleteButton = e.target.matches(".delete-btn");
  const timeToday = e.target.matches("#time-today");
  const timeAll = e.target.matches("#time-all");

  if (deleteButton) {
    removeTask(e);
  } else if (timeToday) {
    clearScreen();
    showTodayTasks();
  } else if (timeAll) {
    clearScreen();
    showAllTasks();
  } else return;
}

function event() {
  const container = document.querySelector(".container");

  container.addEventListener("click", taskContainerEvent);
}

function clearScreen() {
  const showTasks = document.querySelector(".show-tasks");
  showTasks.textContent = "";
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
