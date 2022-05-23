class PhotographersPage {
    constructor() {
        const urlParams = new URLSearchParams(window.location.search)
        this.photographerID = parseInt(urlParams.get('id'))

        this.$mainWrapper = document.querySelector('.content__medias')
        this.$mediasWrapper = document.querySelector('.medias__wrapper')
        this.$priceWrapper = document.querySelector('.likes__price')
        this.$dropdownButton = document.getElementById('sort-by')

        this.photographersApi = new PhotographerApi('../data/FishEyeData.json')
        this.mediaApi = new MediaApi('../data/FishEyeData.json')
    }

    async main() {
        const photographersData = await this.photographersApi.getPhotographers()
        const mediasData = await this.mediaApi.getMedias()

        const PhotographerInfos = new Photographer(
            photographersData.find((photographer) => photographer.id === this.photographerID)
        )

        this.$mainWrapper.prepend(
            new PhotographerCard(PhotographerInfos).createPhotographerInfosCard()
        )

        const Medias = []
        mediasData.forEach((media) => {
            if (media.photographerId === this.photographerID) {
                Medias.push(new MediasFactory(media, PhotographerInfos._name))
            }
        })

        Medias.forEach((media) => {
            const Template = new MediaCard(media)
            this.$mediasWrapper.appendChild(Template.createMediaCard())
        })

        this.$priceWrapper.innerHTML = `${PhotographerInfos.price}€ / jour`
        this.$dropdownButton.addEventListener('click', showDropdown)
        Lightbox.init()
        Likes.init()
    }
}

const app = new PhotographersPage()
app.main()
