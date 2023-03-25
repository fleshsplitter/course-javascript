export default {
  getRandomElement(array) {
    if (!array.length) {
      return null;
    }
  
    return arr[parseInt(Math.random() * (arr.length - 1))];
  },

  async getNextPhoto() {
    const friend = this.getRandomElement(friendsDB);
    const photos = photosDB[friend.id];
    const photo = this.getRandomElement(photos);

    return {friend, url: photo.url};
  },

  login() {},

  init() {},

  photoCache: {},
  getFriendPhotos(id) {
    const photos = this.photoCache[id];

    if (photos) {
      return photos;
    }

    // const photos = вместо этого комментария вставьте код для получения фотографии друга из ВК

    this.photoCache[id] = photos;

    return photos;
  },
};
