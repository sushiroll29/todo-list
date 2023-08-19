import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "./localStorage";
import {
  todo,
  getTodayTasks,
  getUpcomingWeekTasks,
  deleteTask,
  findTaskById,
  getPriorityTasks,
  getCompletedTasks
  
} from "./todo";

let tasks = localStorage.getItem("tasks") ? getFromLocalStorage("tasks") : [];
let taskId = Number(localStorage.getItem("taskId")) || 0; //make sure id doesn't reset to 0 after page reload


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

  if(!task.completed) {
    const taskContainerCompleteBtn = document.createElement("button");
  taskContainerCompleteBtn.classList.add("complete-btn");
  taskContainerCompleteBtn.textContent = `Mark completed`;

  const taskContainerEditBtn = document.createElement("button");
  taskContainerEditBtn.classList.add("edit-btn");
  taskContainerEditBtn.textContent = `Edit`;

  const taskContainerDeleteBtn = document.createElement("button");
  taskContainerDeleteBtn.classList.add("delete-btn");
  taskContainerDeleteBtn.textContent = `Delete`;

  taskContainer.append(
    taskContainerTitle,
    taskContainerDescription,
    taskContainerDate,
    taskContainerPriority,
    taskContainerCompleteBtn,
    taskContainerEditBtn,
    taskContainerDeleteBtn
  );
  } else {
    const taskContainerUnmarkCompleteBtn = document.createElement("button");
  taskContainerUnmarkCompleteBtn.classList.add("unmark-complete-btn");
  taskContainerUnmarkCompleteBtn.textContent = `Unmark completed`;

  const taskContainerDeleteBtn = document.createElement("button");
  taskContainerDeleteBtn.classList.add("delete-btn");
  taskContainerDeleteBtn.textContent = `Delete`;

  taskContainer.append(
    taskContainerTitle,
    taskContainerDescription,
    taskContainerDate,
    taskContainerPriority,
    taskContainerUnmarkCompleteBtn,
    taskContainerDeleteBtn
  );
  }
  

  return taskContainer;
}

function addNewTask() {
  const newTaskBtn = document.querySelector("#new-task-btn");
  const newTaskForm = document.querySelector("#new-task-form");
  const cancelButton = newTaskForm.querySelector("#cancel-task-btn");

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

  const itemId = taskId;
  taskId++;
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
  //tasks get sorted by date every time a new one is added to the list
  sortTasksByDate();
  saveToLocalStorage("tasks", tasks);
  localStorage.setItem("taskId", taskId);
  showTasks.appendChild(createTaskContainer(task));
  closeForm("new-task");
  resetForm("new-task-form");
  showActiveTasks();
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

function showActiveTasks() {
  clearScreen();
  setActiveTab("#time-active");
  
  const showTasks = document.querySelector(".show-tasks");
  tasks.forEach((task) => {
    if(!task.completed) {
      showTasks.appendChild(createTaskContainer(task));
    }
    
  });
  addNewTask();
}

function showPriorityTasks(priorityType) {
  clearScreen();
  setActiveTab(`#${priorityType}-priority`);
  getPriorityTasks(`${priorityType}`);
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
  saveToLocalStorage("tasks", tasks);
}

function editTask(e) {
  const taskId = e.target.parentNode.id;
  let selectedTask = findTaskById(tasks, taskId);
  const editForm = document.querySelector("#edit-task-form");
  const cancelButton = editForm.querySelector("#cancel-edit-btn");
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

      saveToLocalStorage("tasks", tasks);
      sortTasksByDate();
      closeForm("edit-task");
      showActiveTasks();
    },
    { once: true }
  );
}

function toggleComplete(e, status) {
  const taskId = e.target.parentNode.id;
  let selectedTask = findTaskById(tasks, taskId);
  selectedTask.completed = status;
  e.target.parentNode.remove();
  saveToLocalStorage("tasks", tasks);
}

function showCompletedTasks() {
  clearScreen();
  setActiveTab("#completed");
  getCompletedTasks();

}

function handlePageEvent(e) {
  const deleteButton = e.target.matches(".delete-btn");
  const editButton = e.target.matches(".edit-btn");
  const markCompleteButton = e.target.matches(".complete-btn");
  const unmarkCompleteButton = e.target.matches(".unmark-complete-btn");
  const timeToday = e.target.matches("#time-today");
  const timeUpcoming = e.target.matches("#time-upcoming");
  const timeAll = e.target.matches("#time-active");
  const completed = e.target.matches("#completed");
  const priorityLow = e.target.matches("#low-priority");
  const priorityMedium = e.target.matches("#medium-priority");
  const priorityHigh = e.target.matches("#high-priority");

  if (deleteButton) {
    removeTask(e);
  } else if (editButton) {
    editTask(e);
  } else if (markCompleteButton) {
    toggleComplete(e, true);
  } else if (unmarkCompleteButton) {
    toggleComplete(e, false);
  } else if (timeToday) {
    showTodayTasks();
  } else if (timeAll) {
    showActiveTasks();
  } else if (timeUpcoming) {
    showUpcomingTasks();
  } else if (completed) {
    showCompletedTasks();
  } else if (priorityLow) {
    showPriorityTasks("low");
  } else if (priorityMedium) {
    showPriorityTasks("medium");
  } else if (priorityHigh) {
    showPriorityTasks("high");
  } else return;
}

function pageEvent() {
  setActiveTab("#time-active");
  const page = document.querySelector(".container");
  page.addEventListener("click", handlePageEvent);
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
  showActiveTasks,
  showUpcomingTasks,
  removeTask,
  pageEvent,
};
