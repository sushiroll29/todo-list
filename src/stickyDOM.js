import { deleteSticky, sticky, findStickyById } from "./sticky";
import { saveToLocalStorage, getFromLocalStorage } from "./localStorage";
import { clearScreen } from "./DOMmanipulation";
import { setActiveTab } from "./DOMmanipulation";
import { openForm, closeForm, resetForm } from "./DOMmanipulation";

let stickies = localStorage.getItem("stickies")
  ? getFromLocalStorage("stickies")
  : [];
let stickyId = Number(localStorage.getItem("stickyId")); //make sure id doesn't reset to 0 after page reload

function createStickyContainer(sticky) {
  const stickyContainer = document.createElement("div");
  stickyContainer.classList.add("sticky-container");
  stickyContainer.id = sticky.id;

  const stickyContainerTitle = document.createElement("p");
  stickyContainerTitle.classList.add("sticky-container-title");
  stickyContainerTitle.textContent = `${sticky.title}`;

  const stickyContainerContent = document.createElement("p");
  stickyContainerContent.classList.add("sticky-container-content");
  stickyContainerContent.textContent = `${sticky.content}`;

  const stickyContainerEditBtn = document.createElement("button");
  stickyContainerEditBtn.classList.add("edit-sticky-btn");
  stickyContainerEditBtn.textContent = `Edit`;

  const stickyContainerDeleteBtn = document.createElement("button");
  stickyContainerDeleteBtn.classList.add("delete-sticky-btn");
  stickyContainerDeleteBtn.textContent = `Delete`;

  stickyContainer.append(
    stickyContainerTitle,
    stickyContainerContent,
    stickyContainerEditBtn,
    stickyContainerDeleteBtn
  );

  return stickyContainer;
}

function showStickyWall() {
  clearScreen();
  setActiveTab("#sticky-wall");
  const showStickies = document.querySelector(".show-tasks");
  stickies.forEach((sticky) => {
    if(!sticky.completed) {
      showStickies.appendChild(createStickyContainer(sticky));
    }
    
  });
  addNewSticky();
  assignBackgroundColors();
}

function addNewSticky() {
  const newStickyBtn = document.querySelector("#new-sticky-btn");
  const newStickyForm = document.querySelector("#new-sticky-form");
  const cancelButton = newStickyForm.querySelector("#cancel-sticky-btn");

  newStickyBtn.addEventListener("click", () => {
    openForm("new-sticky");
    cancelButton.addEventListener(
      "click",
      () => {
        closeForm("new-sticky");
      },
      { once: true }
    );
    newStickyForm.addEventListener("submit", handleFormSubmit, { once: true });
  });
}

function handleFormSubmit(e) {
  e.preventDefault();
  const showStickies = document.querySelector(".show-tasks");

  const itemId = stickyId;
  stickyId++;
  const formStickyTitle = document.querySelector("#sticky-title").value;
  const formStickyContent = document.querySelector("#sticky-content").value;
  //creates the new task using info provided in the form
  const s = sticky(
    itemId,
    formStickyTitle,
    formStickyContent,
  );

  //adds task to task list and updates the active tasks on the DOM
  stickies.push(s);
  //tasks get sorted by date every time a new one is added to the list
  saveToLocalStorage("stickies", stickies);
  localStorage.setItem("stickyId", stickyId);
  showStickies.appendChild(createStickyContainer(s));
  closeForm("new-sticky");
  resetForm("new-sticky-form");
  showStickyWall();
}

function assignBackgroundColors() {
  const colors = ["#fcf4dd", "#ddedea", "#fce1e4", "#e8dff5", "#daeaf6"];
  const stickyContainers = document.querySelectorAll(".sticky-container");
  let i = 0;

  stickyContainers.forEach((stickyContainer) => {
    stickyContainer.style.backgroundColor = colors[i];

    if (i === colors.length - 1) {
      i = 0;
    } else {
      i++;
    }
  });
}

function removeSticky(e) {
  const stickyContainers = document.querySelectorAll(".sticky-container");
  let stickyContainersList = Array.from(stickyContainers);
  const stickyId = e.target.parentNode.id;
  let selectedStickyContainer = findStickyById(stickyContainersList, stickyId);

  e.target.parentNode.remove();
  stickyContainersList = stickyContainersList.filter(
    (stickyContainer) => stickyContainer != selectedStickyContainer
  );

  deleteSticky(stickies, stickyId);
  saveToLocalStorage("stickies", stickies);
}

export { createStickyContainer, showStickyWall, removeSticky }