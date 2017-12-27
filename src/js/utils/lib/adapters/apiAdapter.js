const _ = require('lodash/fp/object');

export const mapJsonToUrlParams = (params) => {
  if (typeof params !== 'object'){
    return '';
  }
  
  let paramQuery = '';
  for (const param in params) {
    if (params.hasOwnProperty(param)) {
      console.log(`param`);
      paramQuery += `${param}=${params[param]}&`;
    } 
  }
  return `?${paramQuery}`;
};
