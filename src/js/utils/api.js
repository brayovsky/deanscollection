import config from '../config';
import urljoin from 'url-join';
import { mapJsonToUrlParams } from './lib/adapters/apiAdapter';

export function callEndpoint(endpoint, params = null) {
  let url = endpoint;
  if(params){
    const paramQuery = mapJsonToUrlParams(params);
    url = urljoin(url ,params)
  }
  return fetch(url).then((response) => response.json(), (error) => Error('whoopsy'));
};
