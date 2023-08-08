import { addDays, format, isWithinInterval } from "date-fns";
import parseISO from "date-fns/parseISO";

let tasks = [],
  todayTasks = [],
  upcomingTasks = [];

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
    task.index = tasks.length - 1;
  }
}

function getTasks() {
  return tasks;
}

function getTaskArrayLength() {
  return tasks.length;
}

function getTodayTasks() {
  const todayDate = Date.parse(format(new Date(), "yyyy-MM-dd"));

  tasks.forEach((task) => {
    const taskDate = Date.parse(task.dueDate);
    if (todayDate === taskDate) {
      return task;
      // console.log(task);
    }
  });
}

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

function deleteTask(array, elementId) {
  array.splice(elementId, 1);
  //updates the index for each task accordingly after each deletion
  array.forEach((element, i) => {
    element.index = i;
    i++;
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
