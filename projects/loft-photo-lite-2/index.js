import pages from './pages';
import('./styles.css');

const pageNames = ['login', 'main', 'profile'];

document.addEventListener('click', () => {
  pages.openPage(pageNames[Math.floor(Math.random() * pageNames.length)]);
});
