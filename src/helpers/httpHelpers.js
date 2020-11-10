/**
 * Networks helpers functions;
 * @memberof Helpers
 * @namespace Helpers.httpHelpers
 */

/**
 * Get json data via fetch;
 * @param {Object} urlData `{ baseUrl, param, query }`
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

export function getUrl(urlData) {
  const { baseUrl, param, query } = urlData;
  let url = baseUrl;
  if (param) {
    url += `${param}/`;
  }
  if (query) {
    url += "?" + new URLSearchParams(query).toString();
  }
  return url;
}