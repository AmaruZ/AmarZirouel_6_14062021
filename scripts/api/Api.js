class Api {
    constructor(url) {
        this._url = url
    }

    async get() {
        return fetch(this._url)
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }
}

class PhotographerApi extends Api {
    constructor(url) {
        super(url)
    }

    async getPhotographers() {
        const data = await this.get()
        return data.photographers
    }
}

class MediaApi extends Api {
    constructor(url) {
        super(url)
    }

    async getMedias() {
        const data = await this.get()
        return data.media
    }
}
