function saveTasksToLocalStorage(tasks) {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (e) {
    console.warn("Could not save to local storage.");
  }
}

function getTasksFromLocalStorage(keyName) {
  return JSON.parse(localStorage.getItem(`${keyName}`));
}

function deleteTaskFromLocalStorage(task) {
  localStorage.removeItem(task);
}

function saveCompletedTasksToLocalStorage(completedTasks) {
  try {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  } catch (e) {
    console.warn("Could not save completed task to local storage.");
  }
}

export {
  saveTasksToLocalStorage,
  getTasksFromLocalStorage,
  deleteTaskFromLocalStorage,
  saveCompletedTasksToLocalStorage
};
