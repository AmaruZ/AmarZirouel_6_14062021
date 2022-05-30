class MediaCard {
    constructor(media) {
        this._media = media
    }

    createMediaCard() {
        const $wrapper = document.createElement('figure')
        $wrapper.classList.add('media__card')
        //prettier-ignore
        const mediaCard = `${this._media.media}
                            <div class="media__text"><figcaption class="media__title">${this._media.title}</figcaption>
                            <span class="media__likes"><p class="media__likes-number">${this._media.likes} </p><i class="far fa-heart media__heart"></i>
                            </span></div>`
        $wrapper.innerHTML = mediaCard
        return $wrapper
    }
}
