import { getFromLocalStorage } from "./localStorage";
import { createStickyContainer } from "./stickyDOM";

let stickies = localStorage.getItem("stickies") ? getFromLocalStorage("stickies") : [];

function sticky(id, title, content) {
    return {
        id,
        title,
        content
    };
}

// function addStickyToList(sticky) {
//     if (!stickies.includes(sticky)) {
//       stickies.push(sticky);
//       sticky.index = stickies.length - 1;
//     }
// }

function getStickies() {
const showStickies = document.querySelector(".show-tasks");
  stickies.forEach((sticky) => {
      showStickies.appendChild(createStickyContainer(sticky));
  });
  // addStickyToList();
}

function deleteSticky(stickyList, stickyId) {
  stickyList.forEach((sticky) => {
    if (sticky["id"] == stickyId) {
      let index = stickyList.indexOf(sticky);
      stickyList.splice(index, 1);
    }
  });
}

function findStickyById(stickyList, stickyId) {
  const selectedSticky = stickyList.find((sticky) => sticky["id"] == stickyId);
  return selectedSticky;
}


export { sticky, getStickies, deleteSticky, findStickyById }