class Photographer {
    constructor(data) {
        this._name = data.name
        this._id = data.id
        this._city = data.city
        this._country = data.country
        this._tags = data.tags
        this._tagline = data.tagline
        this._price = data.price
        this._portrait = data.portrait
    }

    get name() {
        return this._name
    }

    get id() {
        return this._id
    }

    get city() {
        return this._city
    }

    get country() {
        return this._country
    }

    get localisation() {
        return `${this._city}, ${this._country}`
    }

    get tags() {
        return this._tags
            .map((tag) => {
                const tagWithUpperCase = tag.charAt(0).toUpperCase() + tag.slice(1)
                return `<span class="tags" tabindex="0" aria-label="tag">#${tagWithUpperCase}</span>`
            })
            .join('')
    }

    get tagline() {
        return this._tagline
    }

    get price() {
        return this._price
    }

    get portrait() {
        return `/assets/Photographers ID Photos/${this._portrait}`
    }
}
