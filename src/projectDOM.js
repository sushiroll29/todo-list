import { openFormPopup, closeFormPopup, resetForm } from "./DOMmanipulation";
import { project } from "./project";
import { saveToLocalStorage, getFromLocalStorage } from "./localStorage";

let projects = localStorage.getItem("projects")
  ? getFromLocalStorage("projects")
  : [];
let projectId = Number(localStorage.getItem("projectId")); //make sure id doesn't reset to 0 after page reload

function createProjectListItem(project) {
  const listItem = document.createElement("li");
  listItem.classList.add("project-list-item");
  listItem.id = projectId;
  listItem.textContent = project.title;

  return listItem;
}

function addNewProject() {
  const newProjectForm = document.querySelector("#new-project-form");
  const cancelButton = newProjectForm.querySelector("#cancel-project-btn");

  openFormPopup("new-project");
  cancelButton.addEventListener(
    "click",
    () => {
      closeFormPopup("new-project");
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
  showProjectList();
}

function showProjectList() {
  const projectList = document.querySelector(".project-content");
  projectList.textContent = "Projects";
  projects.forEach((project) => {
    projectList.appendChild(createProjectListItem(project));
  });
}

export { addNewProject, showProjectList };
