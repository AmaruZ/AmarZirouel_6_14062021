import { showDropdown } from './dropDown.js'
import { fetchPhotographersJSON } from './getData.js'
import { Lightbox } from './lightbox.js'
import { Likes } from './likes.js'
import { MediaFactory } from './media.js'
import { openModal } from './modal.js'

const urlParams = new URLSearchParams(window.location.search)
const photographerID = urlParams.get('id')

const wrapperPhotographer = document.querySelector('.infos')
const namePhotographer = document.querySelector('.infos__name')
const localisationPhotographer = document.querySelector('.infos__localisation')
const taglinePhotographer = document.querySelector('.infos__tagline')
const tagsPhotographer = document.querySelector('.infos__tags')
const avatarPhotographer = document.createElement('img')
const wrapperMedias = document.querySelector('.medias__wrapper')
const pricePhotographer = document.querySelector('.likes__price')
const dropDownBtn = document.getElementById('sort-by')

let photographerInfos = {}
export let photographerMedias = []

fetchPhotographersJSON('../data/FishEyeData.json')
    .then((data) => {
        data.photographers.forEach((photographer) => {
            if (photographer.id === parseInt(photographerID)) photographerInfos = photographer
        })
        data.media.forEach((media) => {
            if (media.photographerId === photographerInfos.id) {
                photographerMedias.push(
                    new MediaFactory().createMedia(media, photographerInfos.name)
                )
            }
        })
    })
    .then(() => {
        namePhotographer.innerHTML = photographerInfos.name
        localisationPhotographer.innerHTML =
            photographerInfos.city + ', ' + photographerInfos.country
        taglinePhotographer.innerHTML = photographerInfos.tagline
        photographerInfos.tags.forEach((tag) => {
            tagsPhotographer.innerHTML += `<span class="tags">#${tag}</span>`
        })
        // prettier-ignore
        avatarPhotographer.setAttribute(
            'src',
            `../assets/Photographers ID Photos/${photographerInfos.name.replace(' ', '').replace('-', '')}.jpg`
        )
        avatarPhotographer.setAttribute('alt', 'Avatar ' + photographerInfos.name)
        avatarPhotographer.classList.add('photographer__avatar')
        avatarPhotographer.classList.add('infos__avatar')
        wrapperPhotographer.appendChild(avatarPhotographer)
        photographerMedias.forEach((media) => addMediasInDOM(media))
        dropDownBtn.addEventListener('click', showDropdown) // ajout du dropdown au clic du bouton de tri des medias
        document
            .querySelector('.contact__button')
            .addEventListener('click', openModal(photographerInfos.name)) // ajout de la modal au clic du bouton contactez moi
        Likes.init()
        Lightbox.init()
        pricePhotographer.innerHTML = `${photographerInfos.price}€ / jour`
    })

export const addMediasInDOM = (media) => {
    const mediaCard = document.createElement('figure')
    mediaCard.classList.add('media__card')
    wrapperMedias.appendChild(mediaCard)
    mediaCard.innerHTML = `${media.mediaHTML}
                            <div class="media__text"><figcaption class="media__title">${media.title}</figcaption>
                            <span class="media__likes"><p class="media__likes-number">${media.likes} </p><i class="far fa-heart media__heart"></i></span></div>`
}

export const flushMediasInDOM = () => {
    wrapperMedias.innerHTML = ''
}
