import AbstractView from "./AbstractView.js";

/**
 * Paginator component
 * Used for creating a pagination
 * It accepts two inputs :
 *                         page (current page)
 *                         pages (total pages)
 * It emits one output :
 *                         changedPage (emits page number)
 *
 */
export default class Paginator extends AbstractView {
  /**
   * Output event which emits page number selected
   * @param {number} page
   * @returns
   */
  changedPage = (page) => ({});

  constructor(container) {
    super(container);
    this.container = container;
    this.init();
  }

  /**
   * Setter method for setting current page
   */
  set page(page) {
    this.pageValue = page;
    this.render();
  }

  /**
   * Getter method for getting current page
   */
  get page() {
    return this.pageValue;
  }

  /**
   * Setter method for setting total pages
   */
  set pages(pages) {
    this.pagesValue = pages;
    this.render();
  }

  /**
   * Getter method for getting total pages
   */
  get pages() {
    return this.pagesValue;
  }

  /**
   * Initializing method used to retrieve input from parent and call render function
   */
  init() {
    this.pageValue = parseInt(this.container.dataset.page);
    this.pagesValue = parseInt(this.container.dataset.pages);

    this.render();
  }

  /**
   * Render method which binds the html to the parent container, and finally adds event listeners
   */
  render() {
    this.container.innerHTML = Paginator.getHtml(this);

    this.paginationElements = this.container.querySelector(".pagination");

    this.addEventListeners();
  }

  /**
   * Static method for creating the html structure for the component
   * @param {{number, number}} { page, pages }
   * @returns html as a string
   */
  static getHtml({ page, pages }) {
    const paginatorHtml = () => {
      return pages > 1
        ? `
          <button type="button" class="btn btn__tertiary prev" ${
            page === 1 ? "disabled" : ""
          }>Previos</button>

          <span class="pagination__page">${page}</span>

          <button type="button" class="btn btn__tertiary next" ${
            page === pages ? "disabled" : ""
          }>Next</button>
          `
        : "";
    };

    return `<div class="pagination">
                ${paginatorHtml()}
            </div>`;
  }

  /**
   * Adds event listeners
   */
  addEventListeners() {
    this.bindButtonAction();
  }

  /**
   * Adding event listeners to previous and next button
   */
  bindButtonAction() {
    this.paginationElements.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("prev")) {
        this.page = this.page - 1;
        this.changedPage(this.page);
      } else if (evt.target.classList.contains("next")) {
        this.page = this.page + 1;
        this.changedPage(this.page);
      }
    });
  }
}
