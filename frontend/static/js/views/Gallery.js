import AbstractView from "./AbstractView.js";
import Service from "../service.js";

/**
 * Gallery page component class extended from base class AbstractView
 */

export default class Gallery extends AbstractView {
  photos = [];

  /**
   * Setter method fro setting current photo
   */
  set currentPhoto(currentPhoto) {
    this.currentPhotoValue = currentPhoto;
    this.render();
  }

  /**
   * Getter method fro getting current photo
   */
  get currentPhoto() {
    return this.currentPhotoValue;
  }

  /**
   * Constructor for Gallery
   * @param {Element} container Element reference of the parent element
   */
  constructor(container) {
    super(container);
    this.container = container;
    this.setTitle("Gallery");
    this.init();
  }

  /**
   * Initializing method for gallery component
   */
  init() {
    this.currentPhoto = 1;
    this.service = new Service();
    this.getPhotosFromGallery();
  }

  /**
   * Render method which binds the html to the parent container,
   * and finally adds event listeners
   */
  render() {
    this.container.innerHTML = Gallery.getHtml(this);

    this.galleryElement = this.container.querySelector(".gallery__list");

    this.addEventListeners();
  }

  /**
   * Get photos from gallery and assign the photos to photos properry.
   */
  getPhotosFromGallery() {
    this.service.getPhotosFromGallery().then((res) => {
      this.photos = res;

      this.render();
    });
  }

  /**
   * Static method for creating the html structure for the component
   * @param {{object, number}} { photos, currentPhoto }
   * @returns html as a string
   */
  static getHtml({ photos, currentPhoto }) {
    const galleryList = () => {
      return photos && photos.length
        ? `
        <div class="gallery__list">

            <button type="button" class="prev btn btn__tertiary" ${
              currentPhoto === 1 ? "disabled" : ""
            }>Previos</button>

            
            <div class="gallery__item">
                <span class="gallery__item__header" > ${
                  photos[currentPhoto - 1].title
                } </span>
                <img src="${photos[currentPhoto - 1].largeImgUrl}" /> 
                <span class="gallery__item__footer" > ${currentPhoto} /  ${
            photos.length
          } </span>
            </div> 
            

            <button type="button" class="next btn btn__tertiary" ${
              photos.length === currentPhoto ? "disabled" : ""
            }>Next</button>  
        
        </div>`
        : `
        <div class="gallery__none">
            No images added to gallery.
        </div>`;
    };

    return `
        <div class="gallery">
            <div class="gallery_head">
                <h1>My gallery</h1>

                <a href="/" data-link class="btn btn__secondary">Go to search</a>
            </div>

            ${galleryList()}
            
        </div>
        `;
  }

  /**
   * Adds event listeners
   */
  addEventListeners() {
    this.bindButtonAction();
  }

  /**
   * Adding event listeners to previous and next button for the gallery
   */
  bindButtonAction() {
    this.galleryElement &&
      this.galleryElement.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("prev")) {
          this.currentPhoto = this.currentPhoto - 1;
        } else if (evt.target.classList.contains("next")) {
          this.currentPhoto = this.currentPhoto + 1;
        }
      });
  }
}
