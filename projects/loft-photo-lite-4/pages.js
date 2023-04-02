const pagesMap = {
  login: '.page-login',
  main: '.page-main',
  profile: '.page-profile',
};

export default {
  openPage(name) {
    const pagesList = document.querySelectorAll('.page');

    for (let element of pagesList) {
      console.log(element);
      if (element.classList.contains(name)) {
        element.classList.remove('hidden');
      } else {
        element.classList.add('hidden');
      }
    }
  },
};
