export function mediaFactory(){
    this.createMedia = function(data){
        let media;
        if(data.image != undefined){
            Image.prototype = new Media(data);
            media = new Image(data);
        } else if (data.video != undefined){
            Video.prototype = new Media(data);
            media = new Video(data);
        } else{
            console.log("error");
        }
        return media;
    }
}

function Media(data){
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.tags = data.tags;
        this.likes = data.likes;
        this.date = data.date;
        this.price = data.price;
}

let Image = function(data){
    this.image = data.image;
}

let Video = function(data){
    this.video = data.video;
}


/*
export const MediaFactory = (data) =>{
    if(data.image != undefined){
        return new Image(data);
    } else if (data.video != undefined){
        return new Video(data);
    }
}


class Media{
    constructor(data){
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.tags = data.tags;
        this.likes = data.likes;
        this.date = data.date;
        this.price = data.price;
    }
    
}

class Image extends Media{
    constructor(data){
        super(data);
        this.image = data.image;
    }
}
class Video extends Media{
    constructor(data){
        super(data);
        this.video = data.video;
    }
}

*/