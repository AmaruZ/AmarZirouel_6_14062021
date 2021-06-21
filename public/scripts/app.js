const wrapperPhotographers = document.querySelector(".wrapper");
let photographers= [];



fetch("./scripts/FishEyeData.json")
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        for (let photographer in data.photographers){
            photographers[photographer] = data.photographers[photographer];
            addPhotographerInDOM(photographers[photographer]);


            //console.log(photographers[photographer]);
        }
    });


const addDescription = (photographers) =>{
    if (photographers.description != ""){
        switch(photographers.name){
            case "Mimi Keel": photographers.description = "Voir le beau dans le quotidien";
            break;
        }
    }
}

const addPhotographerInDOM = (photographer) =>{
    const divPhotographer = document.createElement("div");
    divPhotographer.classList.add("photographer")
    wrapperPhotographers.appendChild(divPhotographer);
    divPhotographer.innerHTML=  "<a class=\"photographer__link\" href=\"#\">"+
                                "<img class=\"photographer__avatar\" src=\"./images/Photographers ID Photos/"+ photographer.name.replaceAll(/[^a-zA-Z0-9]/g,"") +".jpg\">"+
                                "<h2 class=\"photographer__name\">" + photographer.name + "</h2></a>"+
                                "<p class=\"photographer__text\"><span class=\"photographer__localisation\">" + photographer.city + ", " + photographer.country + "</span>"+
                                "<span class=\"photographer__tagline\">" + photographer.tagline + "</span>"+
                                "<span class=\"photographer__price\">" + photographer.price + "</span></p>"+
                                "<ul class=\"photographer__tags\"> " + tagInList(photographer.tags) + "</ul>";
                                
    console.log(divPhotographer);
}

const tagInList = (tags) =>{
    let result = "";
    tags.forEach(tag => {
        result += "<li>#"+ tag.charAt(0).toUpperCase() + tag.slice(1) + "</li>";
    });
    return result;
}