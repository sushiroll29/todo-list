import { addDays, format, isWithinInterval } from "date-fns";
import parseISO from "date-fns/parseISO";
import { createTaskContainer } from "./DOMmanipulation";
import {
  saveToLocalStorage,
  getTasksFromLocalStorage,
  deleteTaskFromLocalStorage,
} from "./localStorage";

// let tasks = [],
//   todayTasks = [],
//   upcomingTasks = [];

let tasks = localStorage.getItem("tasks") ? getTasksFromLocalStorage() : [];

function todo(id, title, description, dueDate, priority) {
  return {
    id,
    title,
    description,
    dueDate,
    priority,
  };
}

function addTaskToList(task) {
  if (!tasks.includes(task)) {
    tasks.push(task);
    task.index = tasks.length - 1;
  }
}

// ...
function getTodayTasks() {
  const showTasks = document.querySelector(".show-tasks");
  const todayDate = Date.parse(format(new Date(), "yyyy-MM-dd"));
  let taskList = getTasksFromLocalStorage();
  taskList.forEach((task) => {
    const taskDate = Date.parse(task.dueDate);
    if (todayDate === taskDate) {
      showTasks.appendChild(createTaskContainer(task));
      return true;
    } else return false;
  });
}

function getUpcomingWeekTasks() {
  const showTasks = document.querySelector(".show-tasks");
  let taskList = getTasksFromLocalStorage();
  taskList.forEach((task) => {
    const taskDate = parseISO(task.dueDate);
    if (checkNextWeek(taskDate)) {
      showTasks.appendChild(createTaskContainer(task));
      return true;
    } else return false;
  });
}

function checkNextWeek(date) {
  const nextWeek = addDays(new Date(), 8);
  const todayDate = new Date();
  return isWithinInterval(date, {
    start: todayDate,
    end: nextWeek,
  });
}

function deleteTask(taskList, taskId) {
  taskList.forEach((task) => {
    if (task["id"] == taskId) {
      let index = taskList.indexOf(task);
      taskList.splice(index, 1);
    }
  });
}

export { todo, addTaskToList, getTodayTasks, getUpcomingWeekTasks, deleteTask };
