import {
  openFormPopup,
  closeFormPopup,
  resetForm,
  clearScreen,
  changeAddBtn,
  setActiveTab,
  createEditBtn,
  createDeleteBtn,
} from "./DOMmanipulation";
import { project } from "./project";
import { saveToLocalStorage, getFromLocalStorage } from "./localStorage";
import { findItemById, deleteItemById } from "./itemFunctions";
import {
  checkNoTasks,
  deleteAllTasksInProject,
  showActiveTasks,
  showTasksInProject,
} from "./taskDOM";

let projects = localStorage.getItem("projects")
  ? getFromLocalStorage("projects")
  : [];
let projectId = Number(localStorage.getItem("projectId")); //make sure id doesn't reset to 0 after page reload

function createProjectListItem(project) {
  const listItem = document.createElement("li");
  listItem.classList.add("project-list-item");
  listItem.id = project.id;
  // listItem.textContent = project.title;

  const listItemTitle = document.createElement("span");
  listItemTitle.textContent = project.title;

  const listItemButtons = document.createElement("div");
  listItemButtons.classList.add("list-item-btns");
  const listItemDeleteBtn = createDeleteBtn("project");
  // listItemDeleteBtn.classList.add("delete-project-btn");
  // listItemDeleteBtn.textContent = `Delete`;
  const listItemEditBtn = createEditBtn("project");
  // listItemEditBtn.classList.add("edit-project-btn");
  // listItemEditBtn.textContent = `Edit`;

  listItemButtons.append(listItemEditBtn, listItemDeleteBtn);
  listItem.append(listItemTitle, listItemButtons);

  return listItem;
}

function createProjectContainer(project) {
  const projectContainer = document.createElement("div");
  projectContainer.classList.add("project-container");
  projectContainer.id = project.id;

  const projectTitle = document.createElement("p");
  projectTitle.textContent = project.title;

  const projectContainerEditBtn = document.createElement("button");
  projectContainerEditBtn.classList.add("edit-project-btn");
  projectContainerEditBtn.textContent = `Edit`;

  const projectContainerDeleteBtn = document.createElement("button");
  projectContainerDeleteBtn.classList.add("delete-project-btn");
  projectContainerDeleteBtn.textContent = `Delete`;

  projectContainer.append(
    projectTitle,
    projectContainerEditBtn,
    projectContainerDeleteBtn
  );

  return projectContainer;
}

function addNewProject() {
  const newProjectForm = document.querySelector("#new-project-form");
  const cancelButton = newProjectForm.querySelector("#cancel-project-btn");

  openFormPopup("new-project");
  toggleAddNewProjectButton();
  cancelButton.addEventListener(
    "click",
    () => {
      closeFormPopup("new-project");
      toggleAddNewProjectButton();
    },
    { once: true }
  );
  newProjectForm.addEventListener("submit", handleNewProjectSubmit, {
    once: true,
  });
}

function handleNewProjectSubmit(e) {
  e.preventDefault();
  const projectList = document.querySelector(".project-content");

  const itemId = projectId;
  projectId++;
  const formProjectTitle = document.querySelector("#project-title").value;
  const projectTaskList = [];

  const proj = project(itemId, formProjectTitle, projectTaskList);
  projects.push(proj);
  saveToLocalStorage("projects", projects);
  localStorage.setItem("projectId", projectId);

  //insert the project under the existing ones and above the "add new project" button
  projectList.insertBefore(
    createProjectListItem(proj),
    projectList.lastElementChild
  );
  closeFormPopup("new-project");
  resetForm("new-project-form");
  toggleAddNewProjectButton();
  showProjectList();
}

function showProjectList() {
  const projectList = document.querySelector(".project-content");
  projectList.textContent = "PROJECTS";
  projects.forEach((project) => {
    projectList.appendChild(createProjectListItem(project));
  });
  projectListEvent();
}

function openProject(selectedProject, selectedProjectElement) {
  const showItems = document.querySelector(".show-items");
  clearScreen();
  changeAddBtn("new-task-btn");
  setActiveTab(`.project-list-item[id="${selectedProjectElement.id}"]`);
  // showItems.appendChild(createProjectContainer(selectedProject));
  showTasksInProject(selectedProject);
  checkNoTasks();
}

function projectListEvent() {
  const projectItems = document.querySelectorAll(".project-list-item");
  projectItems.forEach((projectItem) => {
    projectItem.addEventListener("click", () => {
      const selectedProject = findItemById(projects, projectItem.id);
      openProject(selectedProject, projectItem);
    });
  });
}

function toggleAddNewProjectButton() {
  const newProjectBtn = document.querySelector("#new-project-btn");
  const newProjectPopup = document.querySelector("#new-project");
  const editProjectPopup = document.querySelector("#edit-project");

  if (newProjectPopup.style.display == "block" || editProjectPopup.style.display == "block") {
    newProjectBtn.style.display = "none";
  } else {
    newProjectBtn.style.display = "block";
  }
}

function removeProject(e) {
  const projectList = document.querySelectorAll(".project-list-item");
  let projectListArr = Array.from(projectList);
  const projectId = e.target.closest(".project-list-item").id;
  let selectedProjectElement = findItemById(projectListArr, projectId);
  let selectedProject = findItemById(projects, projectId);
  e.target.closest(".project-list-item").remove();
  projectListArr = projectListArr.filter(
    (project) => project != selectedProjectElement
  );
  deleteAllTasksInProject(selectedProject);
  //remove the task from the project array
  deleteItemById(projects, projectId);
  //re-stringify the array after removing the project
  saveToLocalStorage("projects", projects);
  clearScreen();
  showProjectList();
  showActiveTasks();
}

function editProject(e) {
  const projectId = e.target.closest(".project-list-item").id;
  let selectedProject = findItemById(projects, projectId);
  const editForm = document.querySelector("#edit-project-form");
  const cancelButton = editForm.querySelector("#cancel-edit-btn");
  cancelButton.addEventListener(
    "click",
    () => {
      closeFormPopup("edit-project");
      toggleAddNewProjectButton();
    },
    { once: true }
  );
  openFormPopup("edit-project");
  toggleAddNewProjectButton();
  //fill in form inputs with existing info
  populateProjectForm(selectedProject);
  //update the task based on the new input values
  handleEditProjectSubmit(selectedProject);
}

function handleEditProjectSubmit(projectInfo) {
  const editForm = document.querySelector("#edit-project-form");
  editForm.addEventListener(
    "submit",
    (e) => {
      e.preventDefault();

      const newProjectTitle = document.querySelector(
        "#edit-project-title"
      ).value;

      projectInfo.title = newProjectTitle;

      saveToLocalStorage("projects", projects);
      closeFormPopup("edit-project");
      // updateEditedProject(projectInfo);
      showProjectList();
      setActiveTab(`.project-list-item[id="${projectInfo.id}"]`);
    },
    { once: true }
  );
}

function populateProjectForm(projectInfo) {
  const initialProjectTitle = document.querySelector("#edit-project-title");
  initialProjectTitle.value = projectInfo.title;
}

function updateEditedProject(projectInfo) {
  const showItems = document.querySelector(".show-items");
  clearScreen();
  showItems.appendChild(createProjectContainer(projectInfo));
}

function removeTaskFromProject(taskId, selectedProject) {
  for (let i = 0; i < selectedProject.taskList.length; i++) {
    if (taskId == selectedProject.taskList[i]) {
      selectedProject.taskList.splice(i, 1);
      saveToLocalStorage("projects", projects);
    }
  }
}

function getProjectTabInfo() {
  const projectElements = document.querySelectorAll(".project-list-item");
  return Array.from(projectElements).filter((projectElement) =>
    projectElement.classList.contains("active")
  );
}

export {
  addNewProject,
  showProjectList,
  toggleAddNewProjectButton,
  removeProject,
  editProject,
  removeTaskFromProject,
  openProject,
  getProjectTabInfo,
};
