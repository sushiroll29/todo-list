import { todo, addTaskToList, getTasks } from "./todo";

function createTaskContainer(task) {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-card");

  const taskContainerTitle = document.createElement("p");
  taskContainerTitle.classList.add("task-card-title");
  taskContainerTitle.textContent = `Task: ${task.title}`;

  const taskContainerDescription = document.createElement("p");
  taskContainerDescription.classList.add("task-card-description");
  taskContainerDescription.textContent = `Description: ${task.description}`;

  const taskContainerDate = document.createElement("p");
  taskContainerDate.classList.add("task-card-date");
  taskContainerDate.textContent = `Due date: ${task.dueDate}`;

  const taskContainerPriority = document.createElement("p");
  taskContainerPriority.classList.add("task-card-priority");
  taskContainerPriority.textContent = `Priority: ${task.priority}`;

  taskContainer.append(
    taskContainerTitle,
    taskContainerDescription,
    taskContainerDate,
    taskContainerPriority
  );

  return taskContainer;
}

function addNewTask() {
  const formPopup = document.querySelector("#new-task-form");

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
  form.removeEventListener('submit', handleFormSubmit);
}

export { createTaskContainer, addNewTask, handleFormSubmit };
