import {
  openFormPopup,
  closeFormPopup,
  resetForm,
  clearScreen,
  changeAddBtn,
  setActiveTab,
} from "./DOMmanipulation";
import { project } from "./project";
import { saveToLocalStorage, getFromLocalStorage } from "./localStorage";
import { findItemById } from "./itemFunctions";

let projects = localStorage.getItem("projects")
  ? getFromLocalStorage("projects")
  : [];
let projectId = Number(localStorage.getItem("projectId")); //make sure id doesn't reset to 0 after page reload

function createProjectListItem(project) {
  const listItem = document.createElement("li");
  listItem.classList.add("project-list-item");
  listItem.id = project.id;
  listItem.textContent = project.title;

  return listItem;
}

function createProjectContainer(project) {
  const projectContainer = document.createElement("div");
  projectContainer.classList.add("project-container");

  const projectTitle = document.createElement("p");
  projectTitle.textContent = project.title;

  projectContainer.appendChild(projectTitle);

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
  projectList.textContent = "Projects";
  projects.forEach((project) => {
    projectList.appendChild(createProjectListItem(project));
  });
  projectListEvent();
}

function openProject(selectedProject, selectedProjectElement) {
  const showItems = document.querySelector(".show-items");
  clearScreen();
  changeAddBtn("");
  setActiveTab(`.project-list-item[id="${selectedProjectElement.id}"]`);
  showItems.appendChild(createProjectContainer(selectedProject));
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

  if (newProjectPopup.style.display == "block") {
    newProjectBtn.style.display = "none";
  } else {
    newProjectBtn.style.display = "block";
  }
}

export { addNewProject, showProjectList, toggleAddNewProjectButton };
