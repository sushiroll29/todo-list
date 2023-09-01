import {
  showActiveTasks,
  showTodayTasks,
  showUpcomingTasks,
  showPriorityTasks,
  showCompletedTasks,
  editTask,
  removeTask,
  toggleComplete,
  showCollapsedContent,
} from "./taskDOM";
import { showStickyWall, editSticky, removeSticky } from "./stickyDOM";
import { addNewProject, editProject, removeProject } from "./projectDOM";

function openFormPopup(formType) {
  const formPopup = document.querySelector(`#${formType}`);
  formPopup.style.display = "block";
}

function closeFormPopup(formType) {
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

function changeAddBtn(btn) {
  const mainScreen = document.querySelector(".main-screen");
  const buttons = mainScreen.querySelectorAll("button");
  buttons.forEach((button) => {
    if (button.id === `${btn}`) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  });
}

function handlePageEvent(e) {
  const deleteTaskButton = e.target.matches(".delete-task-icon");
  const editTaskButton = e.target.matches(".edit-task-icon");
  const arrowTaskButton = e.target.matches(".arrow-icon")
  const markCompleteButton = e.target.matches(".complete-btn");
  const unmarkCompleteButton = e.target.matches(".unmark-complete-btn");
  const timeToday = e.target.matches("#time-today");
  const timeUpcoming = e.target.matches("#time-upcoming");
  const timeAll = e.target.matches("#time-active");

  const newProject = e.target.matches("#new-project-btn");
  const deleteProjectButton = e.target.matches(".delete-project-btn");
  const editProjectButton = e.target.matches(".edit-project-btn");

  const stickyWall = e.target.matches("#sticky-wall");
  const deleteStickyButton = e.target.matches(".delete-sticky-icon");
  const editStickyButton = e.target.matches(".edit-sticky-icon");

  const completed = e.target.matches("#completed");
  const priorityLow = e.target.matches("#low-priority");
  const priorityMedium = e.target.matches("#medium-priority");
  const priorityHigh = e.target.matches("#high-priority");

  if (deleteTaskButton) {
    removeTask(e);
  } else if (editTaskButton) {
    editTask(e);
  } else if (arrowTaskButton) {
    showCollapsedContent(e);
  } else if (markCompleteButton) {
    toggleComplete(e, true);
  } else if (unmarkCompleteButton) {
    toggleComplete(e, false);
  } else if (timeToday) {
    // changeAddBtn("new-task-btn");
    showTodayTasks();
  } else if (timeAll) {
    changeAddBtn("new-task-btn");
    showActiveTasks();
  } else if (timeUpcoming) {
    // changeAddBtn("new-task-btn");
    showUpcomingTasks();
  } else if (completed) {
    // changeAddBtn("new-task-btn");
    showCompletedTasks();
  } else if (priorityLow) {
    // changeAddBtn("new-task-btn");
    showPriorityTasks("low");
  } else if (priorityMedium) {
    // changeAddBtn("new-task-btn");
    showPriorityTasks("medium");
  } else if (priorityHigh) {
    // changeAddBtn("new-task-btn");
    showPriorityTasks("high");
  } else if (stickyWall) {
    changeAddBtn("new-sticky-btn");
    showStickyWall();
  } else if (deleteStickyButton) {
    removeSticky(e);
  } else if (editStickyButton) {
    editSticky(e);
  } else if (newProject) {
    addNewProject();
  } else if (deleteProjectButton) {
    removeProject(e);
  } else if (editProjectButton) {
    editProject(e);
  }
  
  else return;
}

function pageEvent() {
  setActiveTab("#time-active");
  const page = document.querySelector(".container");
  page.addEventListener("click", handlePageEvent);
}

function clearScreen() {
  const showTasks = document.querySelector(".show-items");
  showTasks.textContent = "";
  document.querySelector(".show-stickies").textContent = "";
}

function setActiveTab(tab) {
  if (document.querySelector(".active")) {
    const lastActive = document.querySelector(".active");
    lastActive.classList.remove("active");
  }

  const currActive = document.querySelector(`${tab}`);
  currActive.classList.add("active");
}

function createEditBtn(className) {
  const editBtn = document.createElement("button");
    const editIcon = document.createElement("img");
    editIcon.alt = "edit-icon";
    editIcon.classList.add("icon-content", `edit-${className}-icon`);
    editIcon.src = "../icons/edit.png";
    editBtn.appendChild(editIcon);

    return editBtn;
}

function createDeleteBtn(className) {
  const deleteBtn = document.createElement("button");
    const deleteIcon = document.createElement("img");
    deleteIcon.alt = "delete-icon";
    deleteIcon.classList.add("icon-content", `delete-${className}-icon`);
    deleteIcon.src = "../icons/delete.png";
    deleteBtn.appendChild(deleteIcon);

  return deleteBtn;
}

export {
  formatDate,
  pageEvent,
  clearScreen,
  setActiveTab,
  changeAddBtn,
  openFormPopup,
  closeFormPopup,
  resetForm,
  createDeleteBtn,
  createEditBtn
};
