import { openFormPopup, closeFormPopup } from "./DOMmanipulation";

function addNewProject() {
    const newProjectForm = document.querySelector("#new-project-form");
    const cancelButton = newProjectForm.querySelector("#cancel-project-btn");
 
      openFormPopup("new-project");
      cancelButton.addEventListener(
        "click",
        () => {
          closeFormPopup("new-project");
        },
        { once: true }
      );
      newProjectForm.addEventListener("submit", handleNewProjectSubmit, {
        once: true,
      });
    }

function handleNewProjectSubmit(e){
    e.preventDefault();
    console.log("project");
}

export { addNewProject }