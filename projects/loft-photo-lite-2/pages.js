const pagesMap = {
  login: '.page-login',
  main: '.page-main',
  profile: '.page-profile',
};

export default {
  openPage(name) {
    const loginDiv = document.querySelector(pagesMap.login);
    const mainDiv = document.querySelector(pagesMap.main);
    const profileDiv = document.querySelector(pagesMap.profile);
    const pages = [loginDiv, mainDiv, profileDiv];

    pages.forEach((element) => {
      // console.log(element.classList.contains(name));
      if (element.classList.contains(name)) {
        element.classList.remove('hidden');
      } else {
        element.classList.add('hidden');
      }
    });
  },
};
