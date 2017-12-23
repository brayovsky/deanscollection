export function callEndpoint(endpoint) {
  const url = apiConstants.API_URL + endpoint;
  return fetch(url, {
    credentials: 'include',
  }).then((response) => response.json())
    .catch(console.error);
}
