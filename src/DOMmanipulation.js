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

function addNewTask() {
    const newTaskBtn = document.querySelector('.new-task-btn');
    
    newTaskBtn.addEventListener('click', () => {
        if(!document.querySelector("#new-task-form")) {
            createFormPopup();
        }
    });

}

function createFormPopup() {
    const newTaskContainer = document.querySelector('.new-task-container');

    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.id = "new-task-form";

    newTaskContainer.appendChild(popup);

    const form = document.createElement("form");
    form.classList.add("form");
    form.id = "form";
    form.action = "";

    popup.appendChild(form);
    form.appendChild(createLabel("title", "Title"));
    form.appendChild(createInput("text", "task-title", "Name your task", 1));

    form.appendChild(createLabel("description", "Description"));
    form.appendChild(createInput("text", "task-description", "Describe your task", ""));

    form.appendChild(createLabel("date", "Due date"));
    form.appendChild(createInput("date", "task-duedate", "", ""));

    const priorityFieldset = document.createElement('fieldset');
    form.appendChild(priorityFieldset);
    const fieldsetLegend = document.createElement('legend');
    fieldsetLegend.textContent = "Priority";
    priorityFieldset.appendChild(fieldsetLegend);
    const priorityContent = document.createElement('div');
    priorityContent.setAttribute("id", "priority-content");
    priorityFieldset.appendChild(priorityContent);

    const priorityChoices = ['Low', 'Medium', 'High'];
    for(let i = 0; i < priorityChoices.length; i++){
        const radioBtn = document.createElement("input");
        radioBtn.setAttribute("type", "radio");
        radioBtn.setAttribute("id", `priority-${priorityChoices[i].toLowerCase()}`);
        radioBtn.setAttribute("value", `${priorityChoices[i].toLowerCase()}`);
        radioBtn.setAttribute("name", "task-priority");

        priorityContent.appendChild(radioBtn);
        priorityContent.appendChild(createLabel(`priority-${priorityChoices[i].toLowerCase()}`, `${priorityChoices[i]}`));
    }

    const submitBtnContent = document.createElement("div");
    submitBtnContent.classList.add("form-button");
    form.appendChild(submitBtnContent);

    const submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("id", "submit-btn");
    submitBtn.textContent = "Add";
    submitBtnContent.appendChild(submitBtn);

    form.addEventListener('submit', (e) => handleFormSubmit(e))

    return newTaskContainer;

}

function createLabel(labelFor, labelText) {
    const label = document.createElement("label");
    label.setAttribute("label", labelFor);
    label.textContent = labelText;

    return label;
}

function createInput(inputType, inputId, inputPlaceholder, required) {
    const input = document.createElement("input");
    input.setAttribute("type", inputType);
    input.setAttribute("id", inputId);
    input.setAttribute("placeholder", inputPlaceholder);
    (required === 1) ? input.setAttribute("required", "") : input.removeAttribute("required");

    return input;
}

function handleFormSubmit(e) {
    e.preventDefault();

    const formTaskTitle = document.querySelector("#task-title").value;
    const formTaskDescription = document.querySelector("#task-description").value;
    const formTaskDueDate = document.querySelector("#task-duedate").value;
    const formTaskPriority = document.querySelector('input[name="task-priority"]:checked').value;
    closeForm();
    console.log(formTaskTitle, formTaskDescription, formTaskDueDate, formTaskPriority);
}

function clearFormFields() {
    const textInputs = document.querySelectorAll('input[type="text"]');
    textInputs.forEach(textInput => textInput.value = "");
}

function closeForm() {
    const formPopup = document.querySelector('#form');
    clearFormFields();
    formPopup.style.display = 'none';
}

export { createTaskContainer, addNewTask, handleFormSubmit } ;