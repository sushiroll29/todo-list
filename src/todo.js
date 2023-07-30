import { createTaskContainer, resetTaskContainer } from "./DOMmanipulation";

let tasks = [];

function todo(title, description, dueDate, priority) {
  return {
    title,
    description,
    dueDate,
    priority,
  };
}

function addTaskToList(task) {
  if (!tasks.includes(task)) {
    tasks.push(task);
  }
}

function getTasks() {
  return tasks;
}

export { todo, addTaskToList, getTasks };
