const PERM_FRIENDS = 2;
const PERM_PHOTOS = 4;

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
        apiId: 51591544,
      });

      VK.Auth.login((response) => {
        if (response.session) {
          this.token = response.session.sid;
          resolve(response);
        } else {
          console.error(response);
          reject(response);
        }
      }, PERM_FRIENDS | PERM_PHOTOS);
    });
  },

  logout() {
    return new Promice((resolve) => VK.Auth.revokeGrants(resolve));
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

  getUsers() {
    const params = {
      fields: ['photo_50', 'photo_100'],
    }

    if (ids) {
      params.user_ids = ids;
    }

    return this.callApi('users.get', params);
  },

  getFriends() {
    const params = {
      fields: ['photo_50', 'photo_100'],
    }

    return this.callApi('friends.get', params);
  },

  async init() {
    this.photoCache = {};
    [this.me] = await this.getUsers();
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

    photos = await this.getPhotos(id);

    this.photoCache[id] = photos;

    return photos;
  },

  async callServer(method, querryParams, body) {
    queryParams = {
      ...queryParams,
      method,
    };
    const query = Object.entries(queryParams)
    .reduce((all, [name, value]) => {
      all.push(`${name}=${encodeURIComponent(value)}`);
      return all;
    }, [])
    .join('&');
    const params = {
      headers: {
        vk_token: this.token,
      },
    };

    if (body) {
      params.method = 'POST';
      params.body = JSON.stringify(body);
    }

    const response = await fetch(`/loft-photo-lite-5/api/?${query}`, params);

    return response.json();

  },

  async like(photo) {
    return this.callServer('like', {photo});
  },

  async photoStats(photo) {
    return this.callServer('photoStats', {photo});
  },

  async getComments(photo) {
    return this.callServer('getComments', {photo});
  },

  async postComment(photo, text) {
    return this.callServer('postComment', {photo}, {text});
  },
};
