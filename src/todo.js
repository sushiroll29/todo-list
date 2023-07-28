import { createTaskContainer } from "./DOMmanipulation";

let tasks = [];

const todo = (title, description, dueDate, priority) => {
    return {
        title,
        description,
        dueDate,
        priority
    }
}

function addTaskToList(task) {
    tasks.push(task);
}

function displayTaskList() {
    tasks.forEach(task => {
        createTaskContainer(task);
    })
}


export {todo, addTaskToList, displayTaskList}