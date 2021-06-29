import { addAvatarToPhotographer } from "./avatar.js";
import { fetchPhotographersJSON } from "./getData.js";
import { mediaFactory } from "./media.js";


const urlParams = new URLSearchParams(window.location.search);
const photographerID = urlParams.get("id");
export let photographer = {};
let medias = [];
const wrapperPhotographer = document.querySelector(".infos");
const namePhotographer = document.querySelector(".infos__name");
const localisationPhotographer = document.querySelector(".infos__localisation");
const taglinePhotographer = document.querySelector(".infos__tagline");
const tagsPhotographer = document.querySelector(".infos__tags");
const avatarPhotographer = document.createElement("img");

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
    }) 
