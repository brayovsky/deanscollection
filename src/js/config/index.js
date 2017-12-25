import * as path from 'path-browserify';

export default {
  apiUrl: path.join(window.location.origin, 'wp/wp-json/wp/v2'),
  baseUrl: window.location.origin,
  imagesUrl: path.join(window.location.origin, 'images'),
};
