import AbstractView from "./AbstractView.js";
import Service from "../service.js";
import Paginator from "./Paginator.js";
import Photo from "../models/Photo.js";

export default class SearchResult extends AbstractView {
  page = 1;
  pages = 1;
  perPage = 70;
  total = null;

  photo = [];

  /**
   * Setter method fro setting isLoading
   */
  set isLoading(isLoading) {
    this.isLoadingValue = isLoading;
    this.render();
  }

  /**
   * Getter method fro getting isLoading
   */
  get isLoading() {
    return this.isLoadingValue;
  }

  /**
   * Constructor for SearchResult
   * @param {Element} container Element reference of the parent element
   * @param {object} params Parameter passed for the respective route
   */
  constructor(container, params) {
    super(container);
    this.container = container;
    this.searchKey = params.key;
    this.setTitle("Search result");
    this.init();
  }

  /**
   * Initializing method for SearchResult component
   */
  init() {
    this.service = new Service();
    this.service.get
    this.getPhotos();
  }

  /**
   * Render method which binds the html to the parent container,
   * and finally adds event listeners
   */
  render() {
    this.container.innerHTML = SearchResult.getHtml(this);

    this.paginatorParent = this.container.querySelector(
      ".search__result__pagination"
    );

    const paginatorComp = new Paginator(this.paginatorParent);

    paginatorComp.changedPage = (page) => {
      this.getPhotos(page);
    };

    this.addEventListeners();
  }

  /**
   * Get photos from flickr
   * @param {number} page Page number
   */
  getPhotos(page = 1) {
    this.isLoading = true;
    this.service
      .getPhotos(this.searchKey, this.perPage, page)
      .then((res) => {
        this.page = res.photos.page;
        this.pages = res.photos.pages;
        this.total = res.photos.total;
        this.photo = res.photos.photo.map(photo => new Photo(photo));
        this.isLoading = false;
        this.render();
      });
  }

  /**
   * Static method for creating the html structure for the component
   * @param {{ string, Array<Photos>, number, number, boolean }} { searchKey, photo, page, pages, isLoading }
   * @returns html as a string
   */
  static getHtml({ searchKey, photo, page, pages, isLoading }) {

    const resultHtml = () => {
        return `<div class="search__result__list" >
                    ${
                    photo && photo.length
                        ? photo
                            .map((pht) => {
                                return `
                                    <div class="search__result__item">
                                        <img src="${pht.thumbnailImgUrl}" title="${pht.title}" /> 
                                        <div class="search__result__button">
                                            <button type=button class="btn btn__round add-btn" data-id=${pht.id} >+</button>
                                        </div>  
                                    </div> 
                                    `;
                                })
                                .join("")
                        : `<div class="search__result__none">
                                <span>No result found</span>
                            </div>`
                    }
                    
                </div>`;
    }

    return `
        <div class="search__result">
            <div class="search__result_head">
                <h1>Search result for : ${searchKey}</h1>
                <div class="search__result__pagination" data-page=${page} data-pages=${pages} >
                </div>
                <a href="/gallery" data-link class="btn btn__secondary">My gallery</a>
            </div>

            ${ isLoading ? '<div class="loader"></div>' : resultHtml() }

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
   * Adding event listeners to add button for adding photos to gallery
   */
  bindButtonAction() {
    const searchResultElem = this.container.querySelector(".search__result");
    
    searchResultElem.addEventListener("click", (evt) => {
        if(evt.target.classList.contains('add-btn')) {
            let id = evt.target.dataset.id;
            let photo = this.photo.find((pht) => pht.id == id);
            this.addToGallery(photo);
        } 
      
      });
  }

  /**
   * Add the photo to gallery
   * @param {Photo} photo - photo model received from flickr api
   */
  addToGallery(photo) {
    this.service.addToGallery(photo);
  }
}
