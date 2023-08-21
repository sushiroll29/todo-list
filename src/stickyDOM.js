import { sticky } from "./sticky";
import { saveToLocalStorage, getFromLocalStorage } from "./localStorage";
import { clearScreen } from "./DOMmanipulation";
import { setActiveTab } from "./DOMmanipulation";
import { openFormPopup, closeFormPopup, resetForm } from "./DOMmanipulation";
import { deleteItemById, findItemById } from "./itemFunctions";

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
  const showStickies = document.querySelector(".show-items");
  stickies.forEach((sticky) => {
    if (!sticky.completed) {
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
    openFormPopup("new-sticky");
    cancelButton.addEventListener(
      "click",
      () => {
        closeFormPopup("new-sticky");
      },
      { once: true }
    );
    newStickyForm.addEventListener("submit", handleNewStickySubmit, {
      once: true,
    });
  });
}

function handleNewStickySubmit(e) {
  e.preventDefault();
  const showStickies = document.querySelector(".show-items");

  const itemId = stickyId;
  stickyId++;
  const formStickyTitle = document.querySelector("#sticky-title").value;
  const formStickyContent = document.querySelector("#sticky-content").value;
  //creates the new task using info provided in the form
  const s = sticky(itemId, formStickyTitle, formStickyContent);
  stickies.push(s);
  saveToLocalStorage("stickies", stickies);
  localStorage.setItem("stickyId", stickyId);
  showStickies.appendChild(createStickyContainer(s));
  closeFormPopup("new-sticky");
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
  let selectedStickyContainer = findItemById(stickyContainersList, stickyId);

  e.target.parentNode.remove();
  stickyContainersList = stickyContainersList.filter(
    (stickyContainer) => stickyContainer != selectedStickyContainer
  );

  deleteItemById(stickies, stickyId);
  saveToLocalStorage("stickies", stickies);
  assignBackgroundColors();
}

function populateStickyForm(stickyInfo) {
  const initialStickyTitle = document.querySelector("#edit-sticky-title");
  const initialStickyContent = document.querySelector(
    "#edit-sticky-content"
  );

  initialStickyTitle.value = stickyInfo.title;
  initialStickyContent.value = stickyInfo.content;
}

function editSticky(e) {
  const stickyId = e.target.parentNode.id;
  let selectedSticky = findItemById(stickies, stickyId);
  const editForm = document.querySelector("#edit-sticky-form");
  const cancelButton = editForm.querySelector("#cancel-edit-btn");
  cancelButton.addEventListener(
    "click",
    () => {
      closeFormPopup("edit-sticky");
    },
    { once: true }
  );
  openFormPopup("edit-sticky");
  populateStickyForm(selectedSticky);
  handleEditStickySubmit(selectedSticky);
}

function handleEditStickySubmit(stickyInfo) {
  const editForm = document.querySelector("#edit-sticky-form");
  editForm.addEventListener(
    "submit",
    (e) => {
      e.preventDefault();

      const newStickyTitle = document.querySelector("#edit-sticky-title").value;
      const newStickyContent = document.querySelector(
        "#edit-sticky-content"
      ).value;
      

      stickyInfo.title = newStickyTitle;
      stickyInfo.content = newStickyContent;

      saveToLocalStorage("stickies", stickies);
      closeFormPopup("edit-sticky");
      showStickyWall();
    },
    { once: true });
}

export { createStickyContainer, showStickyWall, editSticky, removeSticky };
