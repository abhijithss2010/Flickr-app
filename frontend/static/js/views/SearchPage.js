import AbstractView from "./AbstractView.js";

export default class SearchPage extends AbstractView {
  /**
   * Constructor for SearchPage
   * @param {Element} container Element reference of the parent element
   */
  constructor(container) {
    let refs = super(container);
    this.container = container;
    this.setTitle("Search");
    this.init();
  }

  /**
   * Initializing method for SearchPage component
   */
  init() {
    this.render();
  }

  /**
   * Render method which binds the html to the parent container,
   * and finally adds event listeners
   */
  render() {
    this.container.innerHTML = SearchPage.getHtml(this);

    this.formElement = this.container.querySelector(".search__form");

    this.addEventListeners();
  }

  /**
   * Static method for creating the html structure for the component
   * @returns html as a string
   */
  static getHtml() {
    return `
            <div class="search__page">
                <h1>Flickr gallery</h1>
                <div  class="search__form__wrap">
                    <form class="search__form">
                        <div  class="search__field__wrap">
                            <input type="search" placeholder="Search for an image" id="search" name="search">
                            <button class="btn btn__primary">Search</button>
                        </div>
                    </form>
                </div>
                <a href="/gallery" data-link class="btn btn__secondary">My gallery</a>
            </div>
        `;
  }

  /**
   * Adds event listeners
   */
  addEventListeners() {
    this.bindFormSubmitAction();
  }

  /**
   * Adding event listener to form submit action
   */
  bindFormSubmitAction() {
    this.formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();

      let formData = new FormData(evt.target);
      let searchText = Object.fromEntries(formData)["search"];

      if (searchText && searchText.length) {
        const event = new CustomEvent("navigate", {
          detail: { href: "/search/" + searchText },
        });
        document.body.dispatchEvent(event);
      }
    });
  }
}
