import { addDays, format, isWithinInterval } from "date-fns";
import parseISO from "date-fns/parseISO";
import { createTaskContainer } from "./taskDOM";
import { getFromLocalStorage } from "./localStorage";

let tasks = localStorage.getItem("tasks") ? getFromLocalStorage("tasks") : [];

function todo(id, title, description, dueDate, priority, completed, projectId) {
  return {
    id,
    title,
    description,
    dueDate,
    priority,
    completed: false,
    projectId,
  };
}

function getTodayTasks() {
  const showTasks = document.querySelector(".show-items");
  const todayDate = Date.parse(format(new Date(), "yyyy-MM-dd"));
  let taskList = getFromLocalStorage("tasks");
  taskList.forEach((task) => {
    const taskDate = Date.parse(task.dueDate);
    if (todayDate === taskDate) {
      showTasks.appendChild(createTaskContainer(task));
      return true;
    } else return false;
  });
}

function getUpcomingWeekTasks() {
  const showTasks = document.querySelector(".show-items");
  let taskList = getFromLocalStorage("tasks");
  taskList.forEach((task) => {
    const taskDate = parseISO(task.dueDate);
    if (!task.completed && checkNextWeek(taskDate)) {
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

function findTaskById(taskList, taskId) {
  const selectedTask = taskList.find((task) => task["id"] == taskId);
  return selectedTask;
}

function getPriorityTasks(priorityType) {
  const showTasks = document.querySelector(".show-items");
  let taskList = getFromLocalStorage("tasks");

  taskList.forEach((task) => {
    if (!task.completed && task.priority === `${priorityType}`) {
      showTasks.appendChild(createTaskContainer(task));
    }
  });
}

function getCompletedTasks() {
  const showTasks = document.querySelector(".show-items");
  let taskList = getFromLocalStorage("tasks");

  taskList.forEach((task) => {
    if (task.completed) {
      showTasks.appendChild(createTaskContainer(task));
    }
  });
}

export {
  todo,
  getTodayTasks,
  getUpcomingWeekTasks,
  findTaskById,
  getPriorityTasks,
  getCompletedTasks,
};
