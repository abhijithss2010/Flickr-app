/**
 * Photo model class- Define how a single photo should look like
 */
export default class Photo {
  /**
   * Static property which stores all the small image url names,
   * in decreasing creasing order of their image size
   */
  static thumbnailImageUrlNames = [
    "url_n",
    "url_m",
    "url_q",
    "url_s",
    "url_t",
    "url_sq",
  ];

  /**
   * Static property which stores all the large image url names,
   * in decreasing order of their image size
   */
  static largeImageUrlNames = ["url_o", "url_l", "url_c", "url_z"];

  /**
   * 
   * Constructor for Photo class
   * @param {*} photo - flickr photo model
   */
  constructor(photo) {
    this.id = photo.id;
    this.title = photo.title;
    this.thumbnailImgUrl = this.getThumbnailImageUrl(photo);
    this.largeImgUrl = this.getLargeImageUrl(photo);
  }

  /**
   * Returns the best available thumbnail image url
   * @param {*} photo - flickr photo model 
   * @returns {string}
   */
  getThumbnailImageUrl(photo) {
    let availableUrlname = Photo.thumbnailImageUrlNames.find((urlName) => {
        return photo.hasOwnProperty(urlName) && photo[urlName]
    });

    return photo[availableUrlname];
  }

  /**
   * Returns the best available large image url
   * @param {*} photo - flickr photo model 
   * @returns {string}
   */
  getLargeImageUrl(photo) {
    let availableUrlname = Photo.largeImageUrlNames.find((urlName) => {
        return photo.hasOwnProperty(urlName) && photo[urlName]
    });

    return photo[availableUrlname];
  }
}
