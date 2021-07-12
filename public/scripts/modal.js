import { photographer } from "./photographers.js";

const openModalBtn = document.querySelector(".contact__button");
const closeModalBtn = document.querySelector(".modal__close");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal__title");
const submitBtn = document.querySelector(".modal__btn");

const openModal = (e) =>{
    e.preventDefault();
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-modal", "true");
    closeModalBtn.focus();
    modalTitle.innerHTML = `Contactez-moi<br><span class="modal__photographer">${photographer.name}</span>`;

}

const closeModal = () =>{
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-modal", "false");   
}

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape" && modal.getAttribute("aria-hidden") == "false"){
        closeModal();
    }
})

submitBtn.addEventListener("click", e =>{
    e.preventDefault();
    console.log(`Prénom: ${document.getElementById("lastname").value}`);
    console.log(`Nom: ${document.getElementById("firstname").value}`);
    console.log(`Email: ${document.getElementById("email").value}`);
    console.log(`Message: ${document.getElementById("message").value}`);
    closeModal();
})