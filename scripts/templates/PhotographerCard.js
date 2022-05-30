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
                                    <div class="photographer__tags">${this._photographer.tags }</div>`

        $wrapper.innerHTML = photographerCard
        return $wrapper
    }

    createPhotographerInfosCard() {
        const $wrapper = document.createElement('section')
        const $contactButton = document.createElement('a')
        $wrapper.classList.add('infos')
        $contactButton.setAttribute('href', '#modal')
        $contactButton.className = 'contact__button'
        $contactButton.innerText = 'Contactez-moi'
        $contactButton.addEventListener('click', openModal(this._photographer.name))
        //prettier-ignore
        const photographerCard = `  <div class="infos__text" tabindex="0">
                                        <h1 class="infos__name">${this._photographer.name}</h1>
                                        <span class="infos__localisation">${this._photographer.localisation}</span>
                                        <span class="infos__tagline">${this._photographer.tagline}</span>
                                        <div class="infos__tags">${this._photographer.tags}</div>
                                    </div>
                                    <img src="../${this._photographer.portrait}" alt="Avatar ${this._photographer.name}" class="photographer__avatar infos__avatar">
                                    `

        $wrapper.innerHTML = photographerCard

        $wrapper.appendChild($contactButton)
        return $wrapper
    }
}
