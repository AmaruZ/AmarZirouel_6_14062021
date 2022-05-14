import { fetchPhotographersJSON } from './getData.js'

const wrapperPhotographers = document.querySelector('.wrapper')
const spanTags = document.getElementsByClassName('navigation__link')
export let photographers = []

fetchPhotographersJSON('../data/FishEyeData.json')
    .then((data) => {
        data.photographers.forEach((photographer) => {
            photographers.push(photographer)
            addPhotographerInDOM(photographer)
        })
    })
    .then(() => {
        Array.from(spanTags, (tag) => {
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
                                <h2 class="photographer__name">${photographer.name}</h2></a>
                                <p class="photographer__text" tabindex="0"><span class="photographer__localisation">${photographer.city}, ${photographer.country}</span>
                                <span class="photographer__tagline">${photographer.tagline}</span>
                                <span class="photographer__price">${photographer.price}€/jour</span></p>
                                <div class="photographer__tags">${tagInList(photographer.tags)}</div>`
}

const filterByTag = (tag) => {
    flushPhotographersInDOM()
    if (tag.classList.contains('tags-active')) {
        tag.classList.toggle('tags-active')
        tag.setAttribute('aria-label', `tag ${tag.textContent.slice(1)} désélectionné`)
        tag.setAttribute('aria-label', `tag ${tag.textContent.slice(1)}`)
        tag.removeAttribute('aria-selected')
        tag.blur()
        photographers.forEach((photographer) => {
            addPhotographerInDOM(photographer)
        })
    } else {
        for (let i = spanTags.length; i > 0; i--) {
            if (spanTags[i - 1].classList.contains('tags-active')) {
                spanTags[i - 1].classList.toggle('tags-active')
                spanTags[i - 1].setAttribute(
                    'aria-label',
                    `tag ${spanTags[i - 1].textContent.slice(1)}`
                )
                spanTags[i - 1].removeAttribute('aria-selected')
                break
            }
        }

        tag.classList.toggle('tags-active')
        tag.setAttribute('aria-label', `tag ${tag.textContent.slice(1)} sélectionné`)
        tag.setAttribute('aria-selected', 'true')
        for (let i = 0; i < photographers.length; i++) {
            for (let j = photographers[i].tags.length; j > 0; j--) {
                console.log(photographers[i])
                if (
                    '#' +
                        photographers[i].tags[j - 1].charAt(0).toUpperCase() +
                        photographers[i].tags[j - 1].slice(1) ===
                    tag.textContent
                ) {
                    addPhotographerInDOM(photographers[i])
                    break
                } else {
                    console.log('la')
                }
            }
        }
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
