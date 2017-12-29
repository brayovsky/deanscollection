import config from '../config';
import urljoin from 'url-join';
import { mapJsonToUrlParams } from './lib/adapters/apiAdapter';

const handleResponse = (response) => {
  let headers = {}
  response.headers.forEach((value, name) => {
    headers[name] = value;
  });
  return response.json().then((data) => ({
    status: response.status,
    body: data,
    headers,
  }));
};

export const callEndpoint = (endpoint, params = null) => {
  let url = endpoint;
  if(params){
    const paramQuery = mapJsonToUrlParams(params);
    url += paramQuery;
  }
  return fetch(url).then(handleResponse, (error) => Error('whoopsy'));
};
