import { todo, addTaskToList } from "./todo";

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

function resetTaskContainer() {
  const container = document.querySelector(".task-card");
  container.textContent = "";
}

function addNewTask() {
  const formPopup = document.querySelector("#new-task-form");
  const newTaskBtn = document.querySelector("#new-task-btn");

  newTaskBtn.addEventListener("click", () => {
    formPopup.style.display = "block";

    const form = document.querySelector("#form");
    form.addEventListener("submit", (e) => handleFormSubmit(e));
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

const priorities = document.querySelectorAll('input[type="radio"]');
priorities.forEach(priority => {
    if(priority.checked) {
        console.log(priority);
    }
})

  //creates the new task using info provided in the form
  const task = todo(
    formTaskTitle,
    formTaskDescription,
    formTaskDueDate,
    formTaskPriority
  );

  //adds task to task list and updates the active tasks on the DOM
  addTaskToList(task);
  container.appendChild(createTaskContainer(task));
  closeForm();
}

function clearFormFields() {
  const form = document.querySelector("#form");
  form.reset();
}

function closeForm() {
  const formPopup = document.querySelector("#new-task-form");
  clearFormFields();
  formPopup.style.display = "none";
}

export {
  createTaskContainer,
  addNewTask,
  handleFormSubmit,
};
