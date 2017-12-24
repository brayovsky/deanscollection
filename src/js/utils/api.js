import { config } from '../config';
import * as path from 'path-browserify';
import { mapJsonToUrlParams } from './lib/adapters/apiAdapter';

export function callEndpoint(endpoint, params = null) {
  let url = path.join([config.apiUrl, endpoint]);
  if(params){
    const paramQuery = mapJsonToUrlParams(params);
    url = path.join([config.apiUrl ,params])
  }
  return fetch(url).then((response) => response.json())
    .catch(console.error);
};
