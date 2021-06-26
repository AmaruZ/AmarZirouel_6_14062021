import { fetchPhotographersJSON } from "./getData.js";
import { mediaFactory } from "./media.js";


const urlParams = new URLSearchParams(window.location.search);
const photographerID = urlParams.get("id");
let photographer = {};
let medias = [];

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
/*
                if(data.media[i-1].video != undefined){
                    media = Object.assign(Media(data), Video(data.media[i-1].video))
                    console.log(media);
                    medias.push(media);
                } else if(data.media[i-1].image != undefined){
                    //media.createMedia("image");
                    console.log(media, data.media[i-1].image);
                    media = Object.assign(Media(data), Image(data.media[i-1].image))
                    
                    medias.push(media);
                }
                */
            }
        }
        console.log(medias);
    }) 
