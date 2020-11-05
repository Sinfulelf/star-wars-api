/**
 * Networks helpers functions;
 * @memberof Helpers
 * @namespace Helpers.httpHelpers
 */

/**
 * Get json data via fetch;
 * @param {Object} urlData `{ baseUrl, controller, method, param, query }`
 * @param {RequestInit} postBody request body 
 * 
 * @memberof Helpers.httpHelpers
 */
export async function getData(urlData, postBody) {
  const input = getUrl(urlData);

  let response = !postBody
    ? await fetch(input)
    : await fetch(input, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(postBody),
      });
  let data = await response.json();
  return data;
}

function getUrl(urlData) {
  const { baseUrl, controller, method, param, query } = urlData;
  let url = `${baseUrl}${controller}/${method}`;
  if (param) {
    url += `/${param}`;
  }
  if (query) {
    url += query;
  }
  return url;
}
