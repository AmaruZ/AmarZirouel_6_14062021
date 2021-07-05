export class Lightbox{

    constructor(url){
        const lightbox = document.querySelector(".lightbox");
        const close = document.querySelector(".lightbox__close");
        const photoLightBox = document.createElement("img");
        const containerLightBox = document.querySelector(".lightbox__container");
        lightbox.style.display = "block";
        photoLightBox.setAttribute("src", url);
        photoLightBox.classList.add("lightbox__photo");
        containerLightBox.appendChild(photoLightBox);
        close.addEventListener("click", () =>{
            photoLightBox.remove();                
            lightbox.style.display = "none";
            
        });

    }

    closeLightbox(lightbox){
        lightbox.style.display = "none";
    }
}
