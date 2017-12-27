const _ = require('lodash/fp/object');

export const mapJsonToUrlParams = (params) => {
  if (typeof params !== 'object'){
    return '';
  }
  let paramQuery = '';
  _.forOwn(params, (value, key) => {
    paramQuery += `${key}=${value}&`
  });
  return `?${paramQuery}`;
};
