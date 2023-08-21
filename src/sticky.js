import { getFromLocalStorage } from "./localStorage";
import { createStickyContainer } from "./stickyDOM";

let stickies = localStorage.getItem("stickies")
  ? getFromLocalStorage("stickies")
  : [];

function sticky(id, title, content) {
  return {
    id,
    title,
    content,
  };
}

function getStickies() {
  const showStickies = document.querySelector(".show-items");
  stickies.forEach((sticky) => {
    showStickies.appendChild(createStickyContainer(sticky));
  });
}

export { sticky, getStickies };
