function saveTasksToLocalStorage(tasks) {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (e) {
    console.warn("Could not save to local storage.");
  }
}

function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks"));
}

function deleteTaskFromLocalStorage(task) {
  localStorage.removeItem(task);
}

export {
  saveTasksToLocalStorage,
  getTasksFromLocalStorage,
  deleteTaskFromLocalStorage,
};
