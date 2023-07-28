function createTaskContainer(task) {
    const container = document.querySelector('.container');
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-card');

    const taskContainerTitle = document.createElement('p');
    taskContainerTitle.classList.add('task-card-title');
    taskContainerTitle.textContent = `Task: ${task.title}`;

    const taskContainerDescription = document.createElement('p');
    taskContainerDescription.classList.add('task-card-description');
    taskContainerDescription.textContent = `Description: ${task.description}`;

    const taskContainerDate = document.createElement('p');
    taskContainerDate.classList.add('task-card-date');
    taskContainerDate.textContent = `Due date: ${task.dueDate}`;

    const taskContainerPriority = document.createElement('p');
    taskContainerPriority.classList.add('task-card-priority');
    taskContainerPriority.textContent = `Priority: ${task.priority}`;

    taskContainer.append(taskContainerTitle, taskContainerDescription, taskContainerDate, taskContainerPriority);
    container.appendChild(taskContainer);

    return container;

}

export { createTaskContainer } ;