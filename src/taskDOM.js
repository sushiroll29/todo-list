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
import {
  removeTaskFromProject,
  openProject,
  getProjectTabInfo,
} from "./projectDOM";

let tasks = localStorage.getItem("tasks") ? getFromLocalStorage("tasks") : [];
let taskId = Number(localStorage.getItem("taskId")) || 0; //make sure id doesn't reset to 0 after page reload

let projects = localStorage.getItem("projects")
  ? getFromLocalStorage("projects")
  : [];

function createTaskContainer(task) {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");
  taskContainer.id = task.id;

  const taskPrimaryContent = document.createElement("div");
  taskPrimaryContent.classList.add("coll-primary");

  const taskContainerTitle = document.createElement("span");
  taskContainerTitle.classList.add("task-container-title");
  taskContainerTitle.textContent = `${task.title}`;

  const taskContainerRight = document.createElement("div");
  taskContainerRight.classList.add("task-container-right");

  const taskCollapsibleContent = document.createElement("div");
  taskCollapsibleContent.classList.add("coll-content");

  const taskContainerDescription = document.createElement("p");
  taskContainerDescription.classList.add(
    "task-container-description",
    "tc-element"
  );
  taskContainerDescription.textContent = `${task.description}`;
  taskCollapsibleContent.appendChild(taskContainerDescription);

  const taskContainerDate = document.createElement("p");
  taskContainerDate.classList.add("task-container-date", "tc-element");
  task.dueDate
    ? (taskContainerDate.textContent = `Due on ${formatDate(task.dueDate)}`)
    : (taskContainerDate.textContent = `No due date`);

  const taskContainerPriority = document.createElement("p");
  taskContainerPriority.classList.add("task-container-priority", "tc-element");
  taskContainerPriority.textContent = `Priority: ${task.priority}`;

  const taskContainerArrow = document.createElement("i");
  taskContainerArrow.classList.add("task-container-arrow", "tc-element");

  if (!task.completed) {
    const taskContainerCompleteBtn = document.createElement("button");
    taskContainerCompleteBtn.classList.add("complete-btn", "tc-element");
    taskContainerCompleteBtn.textContent = `Mark completed`;

    const taskContainerEditBtn = document.createElement("button");
    taskContainerEditBtn.classList.add("edit-task-btn", "tc-element");
    taskContainerEditBtn.textContent = `Edit`;

    const taskContainerDeleteBtn = document.createElement("button");
    taskContainerDeleteBtn.classList.add("delete-task-btn", "tc-element");
    taskContainerDeleteBtn.textContent = `Delete`;

    taskContainerRight.append(
      taskContainerDate,
      taskContainerPriority,
      taskContainerEditBtn,
      taskContainerDeleteBtn,
      taskContainerArrow
    );
    taskPrimaryContent.append(
      taskContainerCompleteBtn,
      taskContainerTitle,
      taskContainerRight
    );

    taskContainer.append(taskPrimaryContent, taskCollapsibleContent);
  } else {
    const taskContainerUnmarkCompleteBtn = document.createElement("button");
    taskContainerUnmarkCompleteBtn.classList.add("unmark-complete-btn");
    taskContainerUnmarkCompleteBtn.textContent = `Unmark completed`;

    const taskContainerDeleteBtn = document.createElement("button");
    taskContainerDeleteBtn.classList.add("delete-btn");
    taskContainerDeleteBtn.textContent = `Delete`;

    taskContainerRight.append(
      taskContainerDate,
      taskContainerPriority,
      taskContainerDeleteBtn,
      taskContainerArrow
    );

    taskPrimaryContent.append(
      taskContainerUnmarkCompleteBtn,
      taskContainerTitle,
      taskContainerRight
    );

    taskContainer.append(
      taskPrimaryContent,
      taskCollapsibleContent
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
  let selectedProjectItem = "";

  const isProjectTabActive = document.getElementsByClassName(
    "project-list-item active"
  );
  if (isProjectTabActive.length > 0) {
    selectedProject = getProjectTabInfo()[0];
    selectedProjectItem = findItemById(
      JSON.parse(localStorage.getItem("projects")),
      selectedProject.id
    );
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
    // console.log(selectedProjectItem)
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
  isProjectTabActive.length > 0
    ? openProject(selectedProject, selectedProjectItem)
    : showActiveTasks();
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
  createCollapsibleTaskContainer();
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
  const taskId = e.target.closest(".task-container").id;
  let selectedTaskContainer = findItemById(taskContainersList, taskId);
  let selectedTask = findItemById(tasks, taskId);
  let projectId = "";
  let selectedProject = "";

  //remove the task from DOM
  e.target.closest(".task-container").remove();
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
  const taskId = e.target.closest(".task-container").id;
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
  const taskId = e.target.closest(".task-container").id;
  let selectedTask = findItemById(tasks, taskId);
  selectedTask.completed = status;
  e.target.closest(".task-container").remove();
  saveToLocalStorage("tasks", tasks);
}

function showCompletedTasks() {
  clearScreen();
  setActiveTab("#completed");
  getCompletedTasks();
  createCollapsibleTaskContainer();
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

function createCollapsibleTaskContainer() {
  const containers = document.getElementsByClassName("task-container");
  for (let i = 0; i < containers.length; i++) {
    containers[i].addEventListener("click", function () {
      this.classList.toggle("coll-active");
      //each task-container has 2 children: primary content and collapsible content
      let collapsibleContent = this.children[1];
      if (collapsibleContent.style.display === "block") {
        collapsibleContent.style.display = "none";
      } else {
        collapsibleContent.style.display = "block";
      }
    });
  }
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
  deleteAllTasksInProject
};
