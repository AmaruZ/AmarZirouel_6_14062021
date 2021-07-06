import { addMediasInDOM, flushMediasInDOM, medias } from "./photographers.js";
const dropDownBtn = document.getElementById("sort-by");
const dropDownContent = document.querySelector(".sort__options");
const dropDownOptions = document.querySelectorAll(".sort__option");
const selectedOptions = document.querySelector(".sort__option__selected");

dropDownBtn.addEventListener("click", e => showDropdown(e));

const showDropdown = (e)=>{
    e.stopPropagation();
    dropDownContent.classList.add("sort__show")
    
}

dropDownOptions.forEach(option => option.addEventListener("click", (e) => {
    e.stopPropagation();
    e.stopImmediatePropagation();
    dropDownContent.className = "sort__options";
    const classes = option.className.split(" ");
    sortMedias(classes[1]);
}));

const sortMedias = (by) => {
    console.log(by)
    switch(by){
        case "sort__option-1" : {
            medias.sort((a,b) =>  b.likes - a.likes);
            selectedOptions.innerHTML = `Popularité<img src="../images/chevron.svg" class="chevron_down"/>`;
        }
        break;
        case "sort__option-2" : {
            medias.sort((a,b) => new Date(b.date) - new Date(a.date))
            selectedOptions.innerHTML = `Date<img src="../images/chevron.svg" class="chevron_down"/>`;
        }
        break;
        case "sort__option-3" : {
            medias.sort((a,b) => {
                if(a.title.toLowerCase() < b.title.toLowerCase()){
                    return -1
                } else{
                    return 1;
                } 
            })
            selectedOptions.innerHTML = `Titre<img src="../images/chevron.svg" class="chevron_down"/></span>`;
        }
        break;
    }    
    flushMediasInDOM();
    medias.forEach(media => addMediasInDOM(media));

}

//<span class="sort__option__selected" role="button" aria-label="listbox" aria-haspopup="true">Popularité<img src="../images/chevron.svg" class="chevron_down"/></span>