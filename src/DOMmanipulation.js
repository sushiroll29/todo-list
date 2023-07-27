function addTaskToDOM(task) {
    const container = document.querySelector('.container');
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    const taskTitle = document.createElement('p');
    taskTitle.textContent = `Task: ${task.title}`;
    const taskDescription = document.createElement('p');
    taskDescription.textContent = `Description: ${task.description}`;

    taskContainer.appendChild(taskTitle);
    taskContainer.appendChild(taskDescription);
    container.appendChild(taskContainer);

    return container;
}

export default addTaskToDOM;