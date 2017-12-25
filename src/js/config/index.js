import urljoin from 'url-join';

export default {
  apiUrl: urljoin(window.location.origin, 'wp/wp-json/wp/v2'),
  baseUrl: window.location.origin,
  imagesUrl: urljoin(window.location.origin, 'images'),
};
