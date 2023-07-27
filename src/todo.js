import addTaskToDOM from "./DOMmanipulation";

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
        addTaskToDOM(task);
    })
}

export {todo, addTaskToList, displayTaskList}