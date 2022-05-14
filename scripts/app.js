import { fetchPhotographersJSON } from './getData.js'

const wrapperPhotographers = document.querySelector('.wrapper')
const spanTags = document.querySelectorAll('.navigation__link')

export let photographers = []

fetchPhotographersJSON('./data/FishEyeData.json')
    .then((data) => {
        data.photographers.forEach((photographer) => {
            photographers.push(photographer)
            addPhotographerInDOM(photographer)
        })
    })
    .then(() => {
        spanTags.forEach((tag) => {
            tag.addEventListener('click', () => {
                filterByTag(tag)
            })
            tag.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    filterByTag(tag)
                }
            })
        })
        window.addEventListener('scroll', () => {
            let anchor = document.querySelector('.anchor')
            let y = window.scrollY
            if (y >= 160) {
                anchor.style.display = 'block'
            } else {
                anchor.style.display = 'none'
            }
        })
    })
    .catch((error) => {
        console.log(error)
    })

const addPhotographerInDOM = (photographer) => {
    const divPhotographer = document.createElement('article')
    divPhotographer.classList.add('photographer')
    wrapperPhotographers.appendChild(divPhotographer)
    // prettier-ignore
    divPhotographer.innerHTML = `<a class="photographer__link" href="./pages/photographers.html?id=${photographer.id}">
                                    <img class="photographer__avatar" src="assets/Photographers ID Photos/${photographer.name.replace(' ', '').replace('-', '')}.jpg" alt="${photographer.name}">
                                    <h2 class="photographer__name">${photographer.name}</h2>
                                </a>
                                <p class="photographer__text" tabindex="0">
                                    <span class="photographer__localisation">${photographer.city}, ${photographer.country}</span>
                                    <span class="photographer__tagline">${photographer.tagline}</span>
                                    <span class="photographer__price">${photographer.price}€/jour</span>
                                </p>
                                <div class="photographer__tags">${tagInList(photographer.tags)}</div>`
}

const filterByTag = (tag) => {
    flushPhotographersInDOM()
    if (tag.classList.contains('tags-active')) {
        tag.classList.toggle('tags-active')
        tag.setAttribute('aria-selected', 'false')
        tag.blur()
        photographers.forEach((photographer) => {
            addPhotographerInDOM(photographer)
        })
    } else {
        spanTags.forEach((spanTag) => {
            if (spanTag.classList.contains('tags-active')) {
                spanTag.classList.toggle('tags-active')
                spanTag.setAttribute('aria-label', `tag ${spanTag.textContent.slice(1)}`)
                spanTag.setAttribute('aria-selected', 'false')
            }
        })
        tag.classList.toggle('tags-active')
        tag.setAttribute('aria-selected', 'true')
        photographers.forEach((photographer) => {
            photographer.tags.forEach((photographerTag) => {
                if (
                    '#' + photographerTag.charAt(0).toUpperCase() + photographerTag.slice(1) ===
                    tag.textContent
                )
                    addPhotographerInDOM(photographer)
            })
        })
    }
}

const flushPhotographersInDOM = () => {
    while (wrapperPhotographers.firstChild) {
        wrapperPhotographers.firstChild.remove()
    }
}

const tagInList = (tags) => {
    let result = ''
    tags.forEach((tag) => {
        result += `<span class="tags" tabindex="0" aria-label="tag">#${tag
            .charAt(0)
            .toUpperCase()}${tag.slice(1)} </span>`
    })
    return result
}
