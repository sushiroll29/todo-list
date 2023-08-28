import { getFromLocalStorage, saveToLocalStorage } from "./localStorage";
import {
  todo,
  getTodayTasks,
  getUpcomingWeekTasks,
  getPriorityTasks,
  getCompletedTasks,
} from "./task";

import { deleteItemById, findItemById } from "./itemFunctions";
import {
  formatDate,
  clearScreen,
  changeAddBtn,
  setActiveTab,
  openFormPopup,
  closeFormPopup,
  resetForm,
} from "./DOMmanipulation";
import { removeTaskFromProject, openProject, getProjectTabInfo } from "./projectDOM";

let tasks = localStorage.getItem("tasks") ? getFromLocalStorage("tasks") : [];
let taskId = Number(localStorage.getItem("taskId")) || 0; //make sure id doesn't reset to 0 after page reload

let projects = localStorage.getItem("projects")
  ? getFromLocalStorage("projects")
  : [];

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

  if (!task.completed) {
    const taskContainerCompleteBtn = document.createElement("button");
    taskContainerCompleteBtn.classList.add("complete-btn");
    taskContainerCompleteBtn.textContent = `Mark completed`;

    const taskContainerEditBtn = document.createElement("button");
    taskContainerEditBtn.classList.add("edit-task-btn");
    taskContainerEditBtn.textContent = `Edit`;

    const taskContainerDeleteBtn = document.createElement("button");
    taskContainerDeleteBtn.classList.add("delete-task-btn");
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
    openFormPopup("new-task");
    cancelButton.addEventListener(
      "click",
      () => {
        closeFormPopup("new-task");
      },
      { once: true }
    );
    newTaskForm.addEventListener("submit", handleNewTaskSubmit, { once: true });
  });
}

function handleNewTaskSubmit(e) {
  e.preventDefault();
  const showTasks = document.querySelector(".show-items");

  const itemId = taskId;
  taskId++;
  const formTaskTitle = document.querySelector("#task-title").value;
  const formTaskDescription = document.querySelector("#task-description").value;
  const formTaskDueDate = document.querySelector("#task-duedate").value;
  const formTaskPriority = document.querySelector(
    'input[type="radio"]:checked'
  ).value;
  let selectedProject = "";
  let selectedProjectElement = "";

  const isProjectTabActive = document.getElementsByClassName(
    "project-list-item active"
  );
  if(isProjectTabActive.length > 0) {
    selectedProject = getProjectTabInfo()[0];
    selectedProjectElement = findItemById(JSON.parse(localStorage.getItem("projects")), selectedProject.id);
  } 


  //creates the new task using info provided in the form
  const task = todo(
    itemId,
    formTaskTitle,
    formTaskDescription,
    formTaskDueDate,
    formTaskPriority,
    false,
    selectedProject.id
  );
  //add task to the selected project
  
  if (isProjectTabActive.length > 0) {
    projects = getFromLocalStorage("projects");
    // console.log(selectedProjectElement)
    findItemById(projects, selectedProject.id).taskList.push(task.id);
    saveToLocalStorage("projects", projects);
  }
  //add task to task list and update the active tasks on the DOM
  tasks.push(task);
  //tasks get sorted by date every time a new one is added to the list
  sortTasksByDate();
  saveToLocalStorage("tasks", tasks);
  localStorage.setItem("taskId", taskId);
  showTasks.appendChild(createTaskContainer(task));
  closeFormPopup("new-task");
  resetForm("new-task-form");
  isProjectTabActive.length > 0 ?  openProject(selectedProject, selectedProjectElement) : showActiveTasks();
  // showActiveTasks();
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
  changeAddBtn("new-task-btn");
  setActiveTab("#time-active");

  const showTasks = document.querySelector(".show-items");
  tasks.forEach((task) => {
    if (!task.completed) {
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
  let selectedTaskContainer = findItemById(taskContainersList, taskId);
  let selectedTask = findItemById(tasks, taskId);
  let projectId = "";
  let selectedProject = "";

  //remove the task from DOM
  e.target.parentNode.remove();
  taskContainersList = taskContainersList.filter(
    (taskContainer) => taskContainer != selectedTaskContainer
  );

  //remove the task from the task array
  deleteItemById(tasks, taskId);
  //re-stringify the array after removing the task
  saveToLocalStorage("tasks", tasks);
  //remove the task from the project's task list
  if (selectedTask.projectId >= 0) {
    projectId = selectedTask.projectId;
    selectedProject = findItemById(projects, projectId);
    removeTaskFromProject(taskId, selectedProject);
  }
}

function editTask(e) {
  const taskId = e.target.parentNode.id;
  let selectedTask = findItemById(tasks, taskId);
  const editForm = document.querySelector("#edit-task-form");
  const cancelButton = editForm.querySelector("#cancel-edit-btn");
  cancelButton.addEventListener(
    "click",
    () => {
      closeFormPopup("edit-task");
    },
    { once: true }
  );
  openFormPopup("edit-task");
  //fill in form inputs with existing info
  populateTaskForm(selectedTask);
  //update the task based on the new input values
  handleEditTaskSubmit(selectedTask);
}

function populateTaskForm(taskInfo) {
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

function handleEditTaskSubmit(taskInfo) {
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
      closeFormPopup("edit-task");
      showActiveTasks();
    },
    { once: true }
  );
}

function toggleComplete(e, status) {
  const taskId = e.target.parentNode.id;
  let selectedTask = findItemById(tasks, taskId);
  selectedTask.completed = status;
  e.target.parentNode.remove();
  saveToLocalStorage("tasks", tasks);
}

function showCompletedTasks() {
  clearScreen();
  setActiveTab("#completed");
  getCompletedTasks();
}

function sortTasksByDate() {
  tasks.sort(function sortByDate(a, b) {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return dateA - dateB;
  });
}

function showTasksInProject(selectedProject) {
  const showTasks = document.querySelector(".show-items");
  tasks.forEach((task) => {
    if (task.projectId == selectedProject.id) {
      showTasks.appendChild(createTaskContainer(task));
    }
  });
}

function deleteAllTasksInProject(selectedProject) {
  tasks = tasks.filter((task) => task.projectId != selectedProject.id);
  saveToLocalStorage("tasks", tasks);
}

export {
  createTaskContainer,
  showActiveTasks,
  showTodayTasks,
  showUpcomingTasks,
  showCompletedTasks,
  showPriorityTasks,
  toggleComplete,
  editTask,
  removeTask,
  showTasksInProject,
  deleteAllTasksInProject,
};
