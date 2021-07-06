import { photographer } from "./photographers.js";

const openModalBtn = document.querySelector(".contact__button");
const closeModalBtn = document.querySelector(".modal__close");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal__title");
const contentWrapper = document.querySelector(".content__medias")


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