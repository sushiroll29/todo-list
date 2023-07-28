import { addNewTask, handleFormInput } from './DOMmanipulation';
import {todo, addTaskToList, displayTaskList} from './todo';

const task1 = todo('a', 'b', 'c', 'd');
const task2 = todo('x', 'y', 'z', 'w');

addNewTask();

addTaskToList(task1);
addTaskToList(task2);

displayTaskList();
