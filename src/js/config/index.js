import urljoin from 'url-join';
import api from '../constants/api'

export default {
  apiUrl:  api.endpoints.root,
  baseUrl: window.location.origin,
  imagesUrl: urljoin(window.location.origin, 'build/images'),
};
