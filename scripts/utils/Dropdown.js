class Dropdown {
    static init(medias) {
        new Dropdown(medias)
    }

    constructor(medias) {
        this.$dropdownBtn = document.getElementById('sort-by')
        this.$dropdownContent = document.querySelector('.sort__options')
        this.$dropdownOptions = document.querySelectorAll('.sort__option')
        this.$selectedOptions = document.querySelector('.sort__option__selected')
        this.$mediasWrapper = document.querySelector('.medias__wrapper')

        this.$dropdownBtn.addEventListener('click', this.showDropdown.bind(this))
        this.addEventListenerToOptions()
        this.medias = medias
    }

    showDropdown() {
        this.$dropdownBtn.setAttribute('aria-expanded', 'true')
        this.$dropdownContent.classList.add('sort__show')
        this.$dropdownOptions[0].focus()
    }

    // Ajoute les event listeners sur la liste deroulante pour pouvoir trier en fonction de l'option choisie
    addEventListenerToOptions() {
        this.$dropdownOptions.forEach((option) =>
            option.addEventListener('click', (e) => {
                e.stopPropagation()
                e.stopImmediatePropagation()
                this.$dropdownContent.className = 'sort__options'
                const classes = option.className.split(' ')
                this.sortMedias(classes[1])
            })
        )
        this.$dropdownOptions.forEach((option) =>
            option.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault()
                    e.stopPropagation()
                    e.stopImmediatePropagation()
                    this.$dropdownContent.className = 'sort__options'
                    const classes = option.className.split(' ')
                    this.sortMedias(classes[1])
                }
            })
        )
    }

    sortMedias(by) {
        switch (by) {
            case 'sort__option-1':
                {
                    this.medias.sort((a, b) => b.likes - a.likes)
                    this.$selectedOptions.innerHTML = `Popularité<i class="fas fa-chevron-down chevron__down"></i>`
                }
                break
            case 'sort__option-2':
                {
                    this.medias.sort((a, b) => new Date(b.date) - new Date(a.date))
                    this.$selectedOptions.innerHTML = `Date<i class="fas fa-chevron-down chevron__down"></i>`
                }
                break
            case 'sort__option-3':
                {
                    this.medias.sort((a, b) => {
                        if (a.title.toLowerCase() < b.title.toLowerCase()) {
                            return -1
                        } else {
                            return 1
                        }
                    })
                    this.$selectedOptions.innerHTML = `Titre<i class="fas fa-chevron-down chevron__down"></i>`
                }
                break
        }
        this.$mediasWrapper.innerHTML = ''
        this.medias.forEach((media) => {
            const Template = new MediaCard(media)
            this.$mediasWrapper.appendChild(Template.createMediaCard())
        })

        this.$dropdownBtn.setAttribute('aria-expanded', 'false')
        Likes.init()
        Lightbox.init()
    }
}
