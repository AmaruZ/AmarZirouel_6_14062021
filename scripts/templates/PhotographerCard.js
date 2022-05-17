class PhotographerCard {
    constructor(photographer) {
        this._photographer = photographer
    }

    createPhotographerCard() {
        const $wrapper = document.createElement('article')
        $wrapper.classList.add('photographer')
        //prettier-ignore
        const photographerCard = `  <a class="photographer__link" href="./pages/photographers.html?id=${this._photographer.id}">
                                        <img class="photographer__avatar" src="${this._photographer.portrait}" alt="${this._photographer.name}">
                                        <h2 class="photographer__name">${this._photographer.name}</h2>
                                    </a>
                                    <p class="photographer__text" tabindex="0">
                                        <span class="photographer__localisation">${this._photographer.city}, ${this._photographer.country}</span>
                                        <span class="photographer__tagline">${this._photographer.tagline}</span>
                                        <span class="photographer__price">${this._photographer.price}€/jour</span>
                                    </p>
                                    <div class="photographer__tags">${this._photographer.tags.map(tag => {
                                        return `<span class="tags" tabindex="0" aria-label="tag">#${tag.charAt(0).toUpperCase()}${tag.slice(1)}</span>`
                                        }).join('')}
                                    </div>`

        $wrapper.innerHTML = photographerCard
        return $wrapper
    }
}
