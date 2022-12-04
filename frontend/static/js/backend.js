import { CONSTANT_MSG } from "./constants.js";

/**
 * Backend class for mocking the data saving to backend.
 * It uses localstorage as the storage mechanism.
 */
export default class Backend {
  constructor() {}

  /**
   * Adds photo to gallery.
   * @param {*} photo - flickr api photo model
   * @returns {Promise} 
   */
  addToGallery(photo) {
    return new Promise((resolve, reject) => {
      try {
        let data = JSON.parse(localStorage.getItem("gallery"));
        if (data && data instanceof Array && data.length) {
          if (this.photoAlreadyExist(photo, data)) {
            resolve(CONSTANT_MSG.PHOTO_EXIST);
          } else {
            data.push(photo);
            localStorage.setItem("gallery", JSON.stringify(data));
            resolve(photo);
          }
        } else {
          localStorage.setItem("gallery", JSON.stringify([photo]));
          resolve(photo);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Fetch data from gallery
   * @returns {Promise} 
   */
  fetchFromGallery() {
    return new Promise((resolve, reject) => {
      try {
        let data = JSON.parse(localStorage.getItem("gallery"));
        if (data && data instanceof Array && data.length) {
          resolve(data);
        } else {
          resolve(data);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Checks whether the photo is already added.
   * @param {*} photo - Photo model from the Flickr api
   * @param {Array} data - A list of existing photo models
   * @returns {boolean}
   */
  photoAlreadyExist(photo, data) {
    return data.findIndex((dataItem) => dataItem.id === photo.id) !== -1;
  }
}
