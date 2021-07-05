import { addAvatarToPhotographer } from "./avatar.js";
import { fetchPhotographersJSON } from "./getData.js";
import { Lightbox } from "./lightbox.js";
import { mediaFactory } from "./media.js";


const urlParams = new URLSearchParams(window.location.search);
const photographerID = urlParams.get("id");

const wrapperPhotographer = document.querySelector(".infos");
const namePhotographer = document.querySelector(".infos__name");
const localisationPhotographer = document.querySelector(".infos__localisation");
const taglinePhotographer = document.querySelector(".infos__tagline");
const tagsPhotographer = document.querySelector(".infos__tags");
const avatarPhotographer = document.createElement("img");

const wrapperMedias = document.querySelector(".medias__wrapper");

export let photographer = {};
export let medias = [];


fetchPhotographersJSON()
    .then(data =>{
        for(let i = data.photographers.length; i > 0 ; i--){
            if(data.photographers[i-1].id === parseInt(photographerID)){
                photographer = data.photographers[i-1];
                break;
            }
        }
        for(let i = data.media.length; i > 0; i--){
            if(data.media[i-1].photographerId == photographer.id){
                let media = new mediaFactory().createMedia(data.media[i-1]);
                medias.push(media);
/*              if(data.media[i-1].video != undefined){
                    media = Object.assign(Media(data), Video(data.media[i-1].video))
                    console.log(media);
                    medias.push(media);
                } else if(data.media[i-1].image != undefined){
                    //media.createMedia("image");
                    console.log(media, data.media[i-1].image);
                    media = Object.assign(Media(data), Image(data.media[i-1].image))
                    
                    medias.push(media);
                }*/
            }
        }
    }) .finally( () =>{
        namePhotographer.innerHTML = photographer.name;
        localisationPhotographer.innerHTML = photographer.city + ", " + photographer.country;
        taglinePhotographer.innerHTML = photographer.tagline;
        photographer.tags.forEach(tag => {
            tagsPhotographer.innerHTML+="<span class=\"tags\">#" + tag + "</span>" ;
        });
        avatarPhotographer.setAttribute("src", "../images/"+ addAvatarToPhotographer(photographer.name));
        avatarPhotographer.classList.add("photographer__avatar");
        avatarPhotographer.classList.add("infos__avatar");
        wrapperPhotographer.appendChild(avatarPhotographer);
        medias.forEach(media => addMediasInDOM(media));
        const photos = document.querySelectorAll(".media__photo");
        console.log(photos);
        photos.forEach(photo => photo.addEventListener("click", e => {
            // e.preventDefault();
            // console.log(e.currentTarget);
            // const lightbox = document.querySelector(".lightbox");
            // lightbox.style.display = "block";
            // e.currentTarget.getAttribute("src");
            console.log(e.currentTarget.getAttribute("src"))
            new Lightbox(e.currentTarget.getAttribute("src"));
        }))
    }) 

export const addMediasInDOM = (media) =>{
    const mediaCard = document.createElement("div");
    mediaCard.classList.add("media__card");
    wrapperMedias.appendChild(mediaCard);
    if(media.image!= undefined){
        mediaCard.innerHTML =   "<img class=\"media__photo\" src=\"../images/" + getFolderName(photographer) + media.image + "\"/>"
                            + "<div class=\"media__text\"><span class=\"media__title\">"+ media.title + "</span>"
                            + "<span class=\"media__likes\">"+media.likes + "</span></div>";
    } else if(media.video != undefined){
        mediaCard.innerHTML =  `<video width="350" heigth="400" src="../images/${getFolderName(photographer)}${media.video}#t=0.1" type="video/mp4" class="media__photo">Sorry, your browser doesn't support embedded videos.</video>`
                            + "<div class=\"media__text\"><span class=\"media__title\">"+ media.title + "</span>"
                            + "<span class=\"media__likes\">"+media.likes + "</span></div>";
    }
    
    
}

export const flushMediasInDOM = () =>{
    wrapperMedias.innerHTML = "";
}

const getFolderName = (photographer) =>{
    switch(photographer.name){
        case "Mimi Keel": return "Mimi/";
        case "Ellie-Rose Wilkens": return "Ellie Rose/";
        case "Tracy Galindo": return "Tracy/";
        case "Nabeel Bradford" : return "Nabeel/";
        case "Rhode Dubois" : return "Rhode/";
        case "Marcel Nikolic" : return "Marcel/";
    }
}