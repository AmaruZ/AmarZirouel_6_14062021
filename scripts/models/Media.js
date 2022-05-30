class Media {
    constructor(data, name) {
        this._title = data.title
        this._id = data.id
        this._photographerId = data.photographerId
        this._tags = data.tags
        this._likes = data.likes
        this._date = data.date
        this._price = data.price
        this._name = name
    }

    get title() {
        return this._title
    }

    get id() {
        return this._id
    }

    get photographerId() {
        return this._photographerId
    }

    get likes() {
        return this._likes
    }

    get date() {
        return this._date
    }

    get price() {
        return this._price
    }
}

class Picture extends Media {
    constructor(data, name) {
        super(data, name)
        this._image = data.image
    }

    get media() {
        const firstName = this._name.split(' ')[0].replace('-', ' ')
        return `<img class="media__photo" tabIndex="0" alt="${this.alt}" src="/assets/${firstName}/${this._image}"/>`
    }
}

class Video extends Media {
    constructor(data, name) {
        super(data, name)
        this._video = data.video
    }

    get media() {
        const firstName = this._name.split(' ')[0].replace('-', ' ')
        return ` <video controls width="350" heigth="400" class="media__photo" tabIndex="0" src="/assets/${firstName}/${this._video}#t=0.1" type="video/mp4" >Sorry, your browser doesn't support embedded videos.</video>`
    }
}
