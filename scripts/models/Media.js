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

class Image extends Media {
    constructor(data, name) {
        super(data, name)
        this._image = data.image
    }

    get image() {
        return `/assets/${this._name}/${this._image}`
    }
}

class Video extends Media {
    constructor(data, name) {
        super(data, name)
        this._video = data.video
    }

    get video() {
        return `/assets/${this._name}/${this._video}`
    }
}
