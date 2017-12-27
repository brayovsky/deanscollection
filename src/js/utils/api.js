import config from '../config';
import urljoin from 'url-join';
import { mapJsonToUrlParams } from './lib/adapters/apiAdapter';

export const callEndpoint = (endpoint, params = null) => {
  let url = endpoint;
  if(params){
    const paramQuery = mapJsonToUrlParams(params);
    url =+ paramQuery;
  }
  return fetch(url).then((response) => response.json(), (error) => Error('whoopsy'));
};
