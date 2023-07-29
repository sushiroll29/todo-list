import { createTaskContainer, resetTaskContainer } from "./DOMmanipulation";

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
    if(!tasks.includes(task)){
        tasks.push(task);
    }
    
}

function displayTaskList() {
    tasks.forEach(task => {
            createTaskContainer(task);
    })
}


export {todo, addTaskToList, displayTaskList}