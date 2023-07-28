function createTaskContainer(task) {
  const container = document.querySelector(".container");
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
  container.appendChild(taskContainer);

  return container;
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

function createLabel(labelFor, labelText) {
  const label = document.createElement("label");
  label.setAttribute("label", labelFor);
  label.textContent = labelText;

  return label;
}

function createInput(inputType, inputId, inputPlaceholder, required) {
  const input = document.createElement("input");
  input.setAttribute("type", inputType);
  input.setAttribute("id", inputId);
  input.setAttribute("placeholder", inputPlaceholder);
  required === 1
    ? input.setAttribute("required", "")
    : input.removeAttribute("required");

  return input;
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formTaskTitle = document.querySelector("#task-title").value;
  const formTaskDescription = document.querySelector("#task-description").value;
  const formTaskDueDate = document.querySelector("#task-duedate").value;
  const formTaskPriority = document.querySelector(
    'input[name="task-priority"]:checked'
  ).value;
  closeForm();
  console.log(
    formTaskTitle,
    formTaskDescription,
    formTaskDueDate,
    formTaskPriority
  );
}

function clearFormFields() {
  const textInputs = document.querySelectorAll('input[type="text"]');
  textInputs.forEach((textInput) => (textInput.value = ""));
}

function closeForm() {
  const formPopup = document.querySelector("#new-task-form");
  clearFormFields();
  formPopup.style.display = "none";
}

export { createTaskContainer, addNewTask, handleFormSubmit };
