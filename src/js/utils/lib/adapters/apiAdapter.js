export const mapJsonToUrlParams = (params) => {
  if (typeof params !== 'object'){
    return '';
  }
  let paramQuery = '';
  for (const param in params) {
    if (params.hasOwnProperty(param)) {
      paramQuery += `${param}=${params[param]}&`;
    } 
  }
  // Remove trailing & and add ?
  return `?${paramQuery.slice(0, paramQuery.length -1)}`;
};
