/**
 * AbstractView class
 * A base class for creating reusable components
 */

export default class AbstractView {
  ref = null;
  container = null;

  static refs = {};

  /**
   * Constructor for AbstractView
   * @param {Element} container Element reference of the parent element
   */
  constructor(container) {
    this.setUniqueId();
    return AbstractView.refs[container.dataset.ref]
      ? AbstractView.refs[container.dataset.ref]
      : this.setReference(container);
  }

  /**
   * Used for setting title of the page
   * @param {string} title 
   */
  setTitle(title) {
    document.title = title;
  }

  /**
   * Used for setting unique id for the component
   */
  setUniqueId() {
    this.ref = "comp_" + Math.floor(Math.random() * 1000);
  }

  /**
   * Set the reference to the container element
   * @param {Element} container 
   */
  setReference(container) {
    if (typeof container.dataset.ref === "undefined") {
      AbstractView.refs[this.ref] = this;
      container.dataset.ref = this.ref;
    }
  }
}
