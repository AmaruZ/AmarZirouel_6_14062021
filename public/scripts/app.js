import { fetchPhotographersJSON } from "./getData.js";
import { addAvatarToPhotographer } from "./avatar.js";

const wrapperPhotographers = document.querySelector(".wrapper");
const spanTags = document.getElementsByClassName("navigation__link");

export let photographers= [];

fetchPhotographersJSON()
    .then(data =>{
        for(let i = 0; i < data.photographers.length; i++){
            photographers[i] = data.photographers[i];
            addPhotographerInDOM(photographers[i]);
        }
        /*for (let photographer in data.photographers){
            photographers[photographer] = data.photographers[photographer];
            addPhotographerInDOM(photographers[photographer]);
        }*/
    })
    .finally(()=>{
        Array.from(spanTags, tag =>{
            tag.addEventListener("click", ()=>{
                flushPhotographersInDOM();
                if(tag.classList.contains("tags-active")){
                    tag.classList.toggle("tags-active");
                    tag.blur();
                    photographers.forEach(photographer =>{
                        addPhotographerInDOM(photographer);
                    });
                } else{
                    for(let i=spanTags.length; i > 0; i--){
                        if(spanTags[i-1].classList.contains("tags-active")){
                            spanTags[i-1].classList.toggle("tags-active")
                            break;
                        }
                    }
                   /* Array.from(spanTags, tag =>{
                        if(tag.classList.contains("tags-active")){
                            tag.classList.toggle("tags-active");
                        }
                    });*/
                    tag.classList.toggle("tags-active");
                    for(let i=0; i < photographers.length; i++){
                        for(let j=photographers[i].tags.length; j > 0; j--){
                            if("#"+ photographers[i].tags[j-1].charAt(0).toUpperCase() + photographers[i].tags[j-1].slice(1) == tag.textContent ){
                                addPhotographerInDOM(photographers[i]);
                                break;
                            }
                        }
                    }
                    /*
                    photographers.forEach(photographer =>{
                        photographer.tags.forEach(ptag =>{
                            if("#"+ ptag.charAt(0).toUpperCase() + ptag.slice(1) == tag.textContent){
                                addPhotographerInDOM(photographer);
                            }
                        });
                    });*/
                }
                
            });
        });
    })

const addPhotographerInDOM = (photographer) =>{
    const divPhotographer = document.createElement("div");
    divPhotographer.classList.add("photographer")
    wrapperPhotographers.appendChild(divPhotographer);
    divPhotographer.innerHTML=  "<a class=\"photographer__link\" href=\"./pages/photographers.html?id="+ photographer.id +"\">"+
                                //"<img class=\"photographer__avatar\" src=\"./images/Photographers ID Photos/"+ photographer.name.replaceAll(/[^a-zA-Z0-9]/g,"") +".jpg\">"+
                                "<img class=\"photographer__avatar\" src=\"images/"+ addAvatarToPhotographer(photographer.name) +"\">"+
                                "<h2 class=\"photographer__name\">" + photographer.name + "</h2></a>"+
                                "<p class=\"photographer__text\"><span class=\"photographer__localisation\">" + photographer.city + ", " + photographer.country + "</span>"+
                                "<span class=\"photographer__tagline\">" + photographer.tagline + "</span>"+
                                "<span class=\"photographer__price\">" + photographer.price + "€/jour</span></p>"+
                                "<div class=\"photographer__tags\"> " + tagInList(photographer.tags) + "</div>";
}

const flushPhotographersInDOM = () =>{
    while(wrapperPhotographers.firstChild){
        wrapperPhotographers.firstChild.remove();
    }
}

const tagInList = (tags) =>{
    let result = "";
    tags.forEach(tag => {
        result += "<span class=\"tags\">#"+ tag.charAt(0).toUpperCase() + tag.slice(1) + "</span>";
    });
    return result;
}



