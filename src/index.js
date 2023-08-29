import { pageEvent } from "./DOMmanipulation";
import { showProjectList } from "./projectDOM";
import { showActiveTasks, createSmallTaskContainer } from "./taskDOM";

pageEvent();
// createSmallTaskContainer();
showActiveTasks();
showProjectList();
