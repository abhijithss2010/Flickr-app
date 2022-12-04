import Backend from "./backend.js";
import { CONSTANT_MSG, CONSTANTS_ENV } from "./constants.js";

/**
 * Service class for getting photos from flickr and adding photos to gallery
 */
export default class Service {
  baseUrl = null;
  apiKey = null;

  constructor() {
    this.baseUrl = CONSTANTS_ENV.BASE_URL;
    this.apiKey = CONSTANTS_ENV.API_KEY;
    this.defaultParams = {
      api_key: this.apiKey,
      format: "json",
      nojsoncallback: 1,
    };

    this.backend = new Backend();
  }

  /**
   * Get photos by calling the flickr api.
   * @param {string} searchText 
   * @param {number} perPage 
   * @param {number} page 
   * @returns {Promise}
   */
  getPhotos(searchText, perPage, page) {
    let params = {
      text: searchText,
      method: "flickr.photos.search",
      extras:
        "media,path_alias,url_sq,url_t,url_s,url_q,url_m,url_n,url_z,url_c,url_l,url_o",
      per_page: perPage,
      content_type: 1,
      safe_search: 1,
      page: page,
    };
    return fetch(`${this.baseUrl}?${this.setParameters(params)}`).then(
      (response) => response.json()
    );
  }

  /**
   * Generate URLSearchParams
   * @param {object} params - Parameters set for calling flick search api
   * @returns {URLSearchParams}
   */
  setParameters(params) {
    return new URLSearchParams(Object.assign({}, this.defaultParams, params));
  }

  /**
   * Add photo to gallery
   * @param {Photo} photo 
   * @returns {Promise}
   */
  addToGallery(photo) {
    return this.backend
      .addToGallery(photo)
      .then((res) => {
        if (res == CONSTANT_MSG.PHOTO_EXIST) {
          alert(CONSTANT_MSG.PHOTO_EXIST);
        } else {
          alert(CONSTANT_MSG.PHOTO_ADDED);
        }
      })
      .catch((err) => {
        alert(CONSTANT_MSG.PHOTO_UNABLE_ADD);
      });
  }

  /**
   * Get photos from gallery
   * @returns {Promise}
   */
  getPhotosFromGallery() {
    return this.backend.fetchFromGallery().catch((err) => {
      alert(CONSTANT_MSG.PHOTO_UNABLE_FETCH);
    });
  }
}
