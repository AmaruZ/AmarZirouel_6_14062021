class App {
    constructor() {
        this.$photographerWrapper = document.querySelector('.wrapper')
        this.$tags = document.querySelectorAll('.navigation__link')

        this.photographersApi = new PhotographerApi('./data/FishEyeData.json')
    }

    async main() {
        const photographersData = await this.photographersApi.getPhotographers()

        const Photographers = photographersData.map(
            (photographer) => new Photographer(photographer)
        )

        this.displayAllPhotographers(Photographers)

        this.$tags.forEach(($tag) => {
            $tag.addEventListener('click', () => {
                this.filterByTag(Photographers, $tag)
            })
            $tag.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.filterByTag(Photographers, $tag)
                }
            })
        })

        this.addScrollEvent()
    }

    displayAllPhotographers(photographers) {
        this.$photographerWrapper.innerHTML = ''

        photographers.forEach((photographer) => {
            const Template = new PhotographerCard(photographer)
            this.$photographerWrapper.appendChild(Template.createPhotographerCard())
        })
    }

    filterByTag(photographers, tag) {
        if (tag.classList.contains('tags-active')) {
            tag.classList.toggle('tags-active')
            tag.setAttribute('aria-selected', 'false')
            tag.blur()
            console.log(photographers)
            this.displayAllPhotographers(photographers)
        } else {
            const filteredPhotographers = []

            this.$tags.forEach(($tag) => {
                if ($tag.classList.contains('tags-active')) {
                    $tag.classList.toggle('tags-active')
                    $tag.setAttribute('aria-selected', 'false')
                }
            })
            tag.classList.toggle('tags-active')
            tag.setAttribute('aria-selected', 'true')

            photographers.forEach((photographer) => {
                if (photographer.tags.includes(tag.outerText)) {
                    filteredPhotographers.push(photographer)
                }
            })

            this.$photographerWrapper.innerHTML = ''
            filteredPhotographers.forEach((photographer) => {
                const Template = new PhotographerCard(photographer)
                this.$photographerWrapper.appendChild(Template.createPhotographerCard())
            })
        }
    }

    addScrollEvent() {
        window.addEventListener('scroll', () => {
            const $anchor = document.querySelector('.anchor')
            let y = window.scrollY
            if (y >= 160) {
                $anchor.style.display = 'block'
            } else {
                $anchor.style.display = 'none'
            }
        })
    }
}

const app = new App()
app.main()

//     .then(() => {
//         spanTags.forEach((tag) => {
//             tag.addEventListener('click', () => {
//                 filterByTag(tag)
//             })
//             tag.addEventListener('keypress', (e) => {
//                 if (e.key === 'Enter') {
//                     filterByTag(tag)
//                 }
//             })
//         })

// const filterByTag = (tag) => {
//     flushPhotographersInDOM()
//     if (tag.classList.contains('tags-active')) {
//         tag.classList.toggle('tags-active')
//         tag.setAttribute('aria-selected', 'false')
//         tag.blur()
//         photographers.forEach((photographer) => {
//             addPhotographerInDOM(photographer)
//         })
//     } else {
//         spanTags.forEach((spanTag) => {
//             if (spanTag.classList.contains('tags-active')) {
//                 spanTag.classList.toggle('tags-active')
//                 spanTag.setAttribute('aria-label', `tag ${spanTag.textContent.slice(1)}`)
//                 spanTag.setAttribute('aria-selected', 'false')
//             }
//         })
//         tag.classList.toggle('tags-active')
//         tag.setAttribute('aria-selected', 'true')
//         photographers.forEach((photographer) => {
//             photographer.tags.forEach((photographerTag) => {
//                 if (
//                     '#' + photographerTag.charAt(0).toUpperCase() + photographerTag.slice(1) ===
//                     tag.textContent
//                 )
//                     addPhotographerInDOM(photographer)
//             })
//         })
//     }
// }
