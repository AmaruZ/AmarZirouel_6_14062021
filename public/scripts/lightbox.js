/**
 * @property {HTMLElement} element
 * @property {string[]} gallery
 */
export class Lightbox {
  static init() {
    const photos = Array.from(document.querySelectorAll(".media__photo"));
    const gallery = photos.map(photo => photo.getAttribute("src"));
    photos.forEach(photo => photo.addEventListener("click", e => {
      e.preventDefault();
      new Lightbox(e.currentTarget.getAttribute("src"), gallery);
    }));
  }

  /**
     * @param {string} src Source du media
     * @param {string[]} gallery Chemin des medias de la lightbox
     */
  constructor(src, gallery) {
    this.count = 0;
    this.element = this.buildLightboxInDOM();
    this.addMediaInLightbox(src);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.src = src;
    this.gallery = gallery;
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }
  /**
     * Construit la lightbox dans le DOM
     * @returns {HTMLElement}
     */
  buildLightboxInDOM() {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.innerHTML = `<button class="lightbox__close">Fermer</button>
                    <button class="lightbox__next">Suivant</button>
                    <div class="lightbox__container"></div>
                    <button class="lightbox__prev">Précédent</button>`;
    dom.querySelector(".lightbox__close").addEventListener("click", this.closeLightbox.bind(this));
    dom.querySelector(".lightbox__next").addEventListener("click", this.nextMedia.bind(this));
    dom.querySelector(".lightbox__prev").addEventListener("click", this.prevMedia.bind(this));
    return dom;
  }
  /**
     * Ajoute le media dans la lightbox
     * @param {string} src Source du media
     */
  addMediaInLightbox(src){
    const container = this.element.querySelector(".lightbox__container");
    container.innerHTML = "";
    this.src = src;
    if(src.includes(".jpg") || src.includes(".jpeg") || src.includes(".png")){
      const image = new Image();
      container.appendChild(image);
      image.classList.add("lightbox__photo");
      console.log(image);
      image.src = src;
    } else {
      console.log(src)
      container.innerHTML = `<video width="100" heigth="100" controls src="${src}" type="video/mp4" class="lightbox__video">Sorry, your browser doesn't support embedded videos.</video>`
    }
  }
  /**
     *
     * @param {KeyboardEvent} e
     */
  onKeyUp(e) {
    switch(e.key){
      case "Escape" : this.closeLightbox(e);
      break;
      case "ArrowRight" : this.nextMedia(e);
      break;
      case "ArrowLeft": this.prevMedia(e);
    }
  }
  /**
     * Ferme la lightbox
     * @param {MouseEvent} e
     */
  closeLightbox(e) {
    e.preventDefault();
    this.element.remove();
    document.removeEventListener("keyup", this.onKeyUp);
  }
  /**
     * Aller au media suivant
     * @param {MouseEvent/KeyboardEvent} e
     */
  nextMedia(e) {
    e.preventDefault();
    let pos = this.gallery.findIndex(media => media === this.src);
    if(pos >= this.gallery.length-1){
        pos = 0;
    } else{
        pos++;
    }
    this.addMediaInLightbox(this.gallery[pos]);
  }
    /**
     * Aller au media précédent
     * @param {MouseEvent/KeyboardEvent} e
     */
  prevMedia(e){
    e.preventDefault();
    let pos = this.gallery.findIndex(media => media === this.src);
    if(pos === 0){
        pos = this.gallery.length-1;
    } else{
        pos--;
    }
    this.addMediaInLightbox(this.gallery[pos]);

  }
}

/*
<div class="lightbox">
        <button class="lightbox__close">Fermer</button>
        <button class="lightbox__next">Suivant</button>
        <button class="lightbox__prev">Précédent</button>
        <div class="lightbox__container"></div>
    </div>
    */