// eslint-disable-next-line no-unused-vars
import photosDB from './photos.json';
// eslint-disable-next-line no-unused-vars
import friendsDB from './friends.json';

export default {
  getRandomElement(array) {
    if (!array.length) {
      return null;
    }
  
    return arr[parseInt(Math.random() * (arr.length - 1))];
  },
  getNextPhoto() {
    const friend = this.getRandomElement(friendsDB);
    const photos = photosDB[friend.id];
    const photo = this.getRandomElement(photos);

    return {friend, url: photo.url};
  },
};
