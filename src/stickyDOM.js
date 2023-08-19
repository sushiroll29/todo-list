import { getFromLocalStorage } from "./localStorage";

let stickies = localStorage.getItem("stickies")
  ? getFromLocalStorage("stickies")
  : [];
let stickiesId = Number(localStorage.getItem("stickiesId")) || 0; //make sure id doesn't reset to 0 after page reload

function createStickyContainer(sticky) {
  const stickyContainer = document.createElement("div");
  stickyContainer.classList.add("sticky-container");
  stickyContainer.id = sticky.id;

  const stickyContainerTitle = document.createElement("p");
  stickyContainerTitle.classList.add("sticky-container-title");
  stickyContainerTitle.textContent = `${sticky.title}`;

  const stickyContainerContent = document.createElement("p");
  stickyContainerContent.classList.add("sticky-container-description");
  stickyContainerContent.textContent = `${sticky.description}`;

  const stickyContainerEditBtn = document.createElement("button");
  stickyContainerEditBtn.classList.add("edit-btn");
  stickyContainerEditBtn.textContent = `Edit`;

  const stickyContainerDeleteBtn = document.createElement("button");
  stickyContainerDeleteBtn.classList.add("delete-btn");
  stickyContainerDeleteBtn.textContent = `Delete`;

  stickyContainer.append(
    stickyContainerTitle,
    stickyContainerContent,
    stickyContainerEditBtn,
    stickyContainerDeleteBtn
  );

  return stickyContainer;
}
