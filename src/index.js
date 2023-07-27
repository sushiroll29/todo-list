import {todo, addTaskToList, displayTaskList} from './todo';

const task1 = todo('a', 'b', 'c', 'd');
const task2 = todo('x', 'y', 'z', 'w');
const para = document.querySelector('.para');
// para.textContent = `${task.title} ${task.description} is due on ${task.dueDate}`;

addTaskToList(task1);
addTaskToList(task2);

displayTaskList();
