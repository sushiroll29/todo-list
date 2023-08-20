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

export { sticky, getStickies }