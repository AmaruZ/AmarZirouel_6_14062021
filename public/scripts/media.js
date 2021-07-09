export class MediaFactory {
    constructor() {
        this.createMedia = function (data) {
            let media;
            if (data.image != undefined) {
                media = new ImageFactory(data);
            } else if (data.video != undefined) {
                media = new VideoFactory(data);
            } else {
                console.log("error");
            }
            return media;
        }
    }
}

class Media {
    constructor(data) {
        this.id = data.id;
        this.photographerId = data.photographerId;
        this.title = data.title;
        this.tags = data.tags;
        this.likes = data.likes;
        this.date = data.date;
        this.price = data.price;
    }
}

class ImageFactory extends Media {
    constructor(data) {
        super(data);
        this.image = data.image;
    }
}

class VideoFactory extends Media {
    constructor(data) {
        super(data);
        this.video = data.video;
    }
}
