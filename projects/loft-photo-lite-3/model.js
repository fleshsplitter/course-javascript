import { resolve } from "path";

export default {
  getRandomElement(array) {
    if (!array.length) {
      return null;
    }

    return arr[parseInt(Math.random() * (arr.length - 1))];
  },

  async getNextPhoto() {
    const friend = this.getRandomElement(this.friends.items);
    const photos = await this.getFriendPhotos(friend.id);
    const photo = this.getRandomElement(photos.items);
    const size = this.findSize(photo);

    return { friend, id: photo.id, url: size.url };
  },

  findSize() {
    const size = photo.sizes.find((size) => size.width >= 360);

    if (!size) {
      return photo.sizes.reduce((biggest, current) => {
        if (current.width > biggest.width) {
          return current;
        }

        return biggest;
      }, photo.sizes[0]);
    }

    return size;
  },

  login() {
    return new Promise((resolve, reject) => {
      VK.init({
        apiId: APP_ID,
      });
      
      VK.Auth.login((response) => {
        if (response.session) {
          resolve(response);
        } else {
          console.error(response);
          reject(response);
        }
      }, PERM_FRIENDS | PERM_PHOTOS);
    });
  },

  callApi(method, params) {
    params.v = '5.81';

    return new Promise((resolve, reject) => {
      VK.api(method, params, (response) => {
        if (response.error) {
          reject(new Error(response.error.error_msg));
        } else {
          resolve(response.response);
        }
      })
    })
  },

  getFriends() {
    const params = {
      fields: ['photo_50', photo_100],
    }

    return this.callApi('friends.get', params);
  },

  async init() {
    this.photoCache = {};
    this.friends = await this.getFriends();
  },

  getPhotos(owner) {
    const params = {
      owner_id: owner,
    };

    return this.callApi('photos.getAll', params);
  },

  // photoCache: {},
  async getFriendPhotos(id) {
    const photos = this.photoCache[id];

    if (photos) {
      return photos;
    }

    // const photos = вместо этого комментария вставьте код для получения фотографии друга из ВК
    photos = await this.getPhotos(id);

    this.photoCache[id] = photos;

    return photos;
  },
};
