import { getTasks } from "./todo";

function saveTasksToLocalStorage() {
  let tasks = getTasks();
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (e) {
    console.warn("Could not save to local storage.");
  }
}

function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks"));
}

export { saveTasksToLocalStorage, getTasksFromLocalStorage };
