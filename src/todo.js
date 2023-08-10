import { addDays, format, isWithinInterval } from "date-fns";
import parseISO from "date-fns/parseISO";
import { createTaskContainer } from "./DOMmanipulation";

let tasks = [],
  todayTasks = [],
  upcomingTasks = [];

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

function getTasks() {
  return tasks;
}

function getTaskArrayLength() {
  return tasks.length;
}

// ...
function getTodayTasks() {
  const showTasks = document.querySelector(".show-tasks");
  const todayDate = Date.parse(format(new Date(), "yyyy-MM-dd"));
  const allTasks = getTasks();
  allTasks.forEach((task) => {
    const taskDate = Date.parse(task.dueDate);
    if (todayDate === taskDate) {
      showTasks.appendChild(createTaskContainer(task));
      return true;
    } else return false;
  });
}

function getAllTasks() {}

function getUpcomingWeekTasks() {
  tasks.forEach((task) => {
    const taskDate = parseISO(task.dueDate);
    if (checkNextWeek(taskDate)) {
      return task;
    } else return;
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

function deleteTask(taskId) {
  tasks.forEach((task) => {
    if (task["id"] == taskId) {
      let index = tasks.indexOf(task);
      tasks.splice(index, 1);
    }
  });
}

export {
  todo,
  addTaskToList,
  getTasks,
  getTodayTasks,
  getUpcomingWeekTasks,
  deleteTask,
  getTaskArrayLength,
};
