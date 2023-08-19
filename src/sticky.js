import { getFromLocalStorage } from "./localStorage";

let stickies = localStorage.getItem("stickies") ? getFromLocalStorage("stickies") : [];

function sticky(id, title, content) {
    return {
        id,
        title,
        content
    };
}

function addStickyToList(sticky) {
    if (!stickies.includes(sticky)) {
      stickies.push(sticky);
      sticky.index = stickies.length - 1;
    }
  }

export { sticky, addStickyToList }