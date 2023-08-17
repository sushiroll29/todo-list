import {
  getTasksFromLocalStorage,
  saveTasksToLocalStorage,
} from "./localStorage";
import {
  todo,
  getTodayTasks,
  getUpcomingWeekTasks,
  deleteTask,
  findTaskById,
} from "./todo";

let tasks = localStorage.getItem("tasks") ? getTasksFromLocalStorage() : [];
let id = Number(localStorage.getItem("id")) || 0; //make sure id doesn't reset to 0 after page reload

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

  const taskContainerEditBtn = document.createElement("button");
  taskContainerEditBtn.classList.add("edit-btn");
  taskContainerEditBtn.textContent = `Edit`;

  taskContainer.append(
    taskContainerTitle,
    taskContainerDescription,
    taskContainerDate,
    taskContainerPriority,
    taskContainerDeleteBtn,
    taskContainerEditBtn
  );

  return taskContainer;
}

function addNewTask() {
  const newTaskBtn = document.querySelector("#new-task-btn");
  const newTaskForm = document.querySelector("#new-task-form");
  const cancelButton = newTaskForm.querySelector("#cancel-btn");

  newTaskBtn.addEventListener("click", () => {
    openForm("new-task");
    cancelButton.addEventListener(
      "click",
      () => {
        closeForm("new-task");
      },
      { once: true }
    );
    newTaskForm.addEventListener("submit", handleFormSubmit, { once: true });
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
  sortTasksByDate();
  //tasks get sorted by date every time a new one is added to the list
  // tasks.sort(function sortByDate(a, b) {
  //   const dateA = new Date(a.dueDate);
  //   const dateB = new Date(b.dueDate);
  //   return dateA - dateB;
  // });
  saveTasksToLocalStorage(tasks);
  localStorage.setItem("id", id);
  showTasks.appendChild(createTaskContainer(task));
  closeForm("new-task");
  resetForm("new-task-form");
  showAllTasks();
}

function openForm(formType) {
  const formPopup = document.querySelector(`#${formType}`);
  formPopup.style.display = "block";
}

function closeForm(formType) {
  const formPopup = document.querySelector(`#${formType}`);
  formPopup.style.display = "none";
}

function resetForm(formId) {
  const form = document.querySelector(`#${formId}`);
  form.reset();
}

function formatDate(date) {
  return date.slice(0, 10).split("-").reverse().join("/");
}

function showTodayTasks() {
  clearScreen();
  setActiveTab("#time-today");
  getTodayTasks();
}

function showUpcomingTasks() {
  clearScreen();
  setActiveTab("#time-upcoming");
  getUpcomingWeekTasks();
}

function showAllTasks() {
  clearScreen();
  setActiveTab("#time-all");
  const showTasks = document.querySelector(".show-tasks");
  tasks.forEach((task) => {
    showTasks.appendChild(createTaskContainer(task));
  });
}

function removeTask(e) {
  const taskContainers = document.querySelectorAll(".task-container");
  let taskContainersList = Array.from(taskContainers);
  //find the task that needs to be removed
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

function editTask(e) {
  const taskId = e.target.parentNode.id;
  let selectedTask = findTaskById(tasks, taskId);
  const editForm = document.querySelector("#edit-task-form");
  const cancelButton = editForm.querySelector("#cancel-btn");
  cancelButton.addEventListener(
    "click",
    () => {
      closeForm("edit-task");
    },
    { once: true }
  );
  openForm("edit-task");
  //fill in form inputs with existing info
  populateForm(selectedTask);
  //update the task based on the new input values
  handleEditForm(selectedTask);
}

function populateForm(taskInfo) {
  const initialTaskTitle = document.querySelector("#edit-task-title");
  const initialTaskDescription = document.querySelector(
    "#edit-task-description"
  );
  const initialTaskDueDate = document.querySelector("#edit-task-duedate");
  const taskPriorities = document.querySelectorAll('input[type="radio"]');

  initialTaskTitle.value = taskInfo.title;
  initialTaskDescription.value = taskInfo.description;
  initialTaskDueDate.value = taskInfo.dueDate;
  taskPriorities.forEach((priority) => {
    if (taskInfo.priority == priority.value) {
      priority.checked = true;
    }
  });
}

function handleEditForm(taskInfo) {
  const editForm = document.querySelector("#edit-task-form");
  editForm.addEventListener(
    "submit",
    (e) => {
      e.preventDefault();

      const newTaskTitle = document.querySelector("#edit-task-title").value;
      const newTaskDescription = document.querySelector(
        "#edit-task-description"
      ).value;
      const newTaskDueDate = document.querySelector("#edit-task-duedate").value;
      let newTaskPriority = "";
      const taskPriorities = document.querySelectorAll('input[type="radio"]');
      taskPriorities.forEach((priority) => {
        if (priority.checked) {
          newTaskPriority = priority.value;
        }
      });

      taskInfo.title = newTaskTitle;
      taskInfo.description = newTaskDescription;
      taskInfo.dueDate = newTaskDueDate;
      taskInfo.priority = newTaskPriority;

      saveTasksToLocalStorage(tasks);
      sortTasksByDate();
      closeForm("edit-task");
      showAllTasks();
    },
    { once: true }
  );
}

function taskContainerEvent(e) {
  const deleteButton = e.target.matches(".delete-btn");
  const editButton = e.target.matches(".edit-btn");
  const timeToday = e.target.matches("#time-today");
  const timeUpcoming = e.target.matches("#time-upcoming");
  const timeAll = e.target.matches("#time-all");

  if (deleteButton) {
    removeTask(e);
  } else if (editButton) {
    editTask(e);
  } else if (timeToday) {
    showTodayTasks();
  } else if (timeAll) {
    showAllTasks();
  } else if (timeUpcoming) {
    showUpcomingTasks();
  } else return;
}

function pageEvent() {
  setActiveTab("#time-all");
  const taskContainer = document.querySelector(".container");
  taskContainer.addEventListener("click", taskContainerEvent);
}

function clearScreen() {
  const showTasks = document.querySelector(".show-tasks");
  showTasks.textContent = "";
}

function setActiveTab(tab) {
  if (document.querySelector(".active")) {
    const lastActive = document.querySelector(".active");
    lastActive.classList.remove("active");
  }

  const currActive = document.querySelector(`${tab}`);
  currActive.classList.add("active");
}

function sortTasksByDate() {
  tasks.sort(function sortByDate(a, b) {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return dateA - dateB;
  });
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
