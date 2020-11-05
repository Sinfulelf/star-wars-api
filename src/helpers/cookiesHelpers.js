/**
 * Coockies helpers functions;
 * @memberof Helpers
 * @namespace Helpers.cookiesHelpers
 */

/**
 * Check site cookies on exists and not expires;
 *
 * @returns {boolean}
 * @memberof Helpers.cookiesHelpers
 */
export function checkCookiesOnExists() {
  return !!document.cookie;
}

let updateCookiesInterval = 0;
/**
 * Set user data to cookies;
 * <pre>
 * - When cookie expires and session is actiove, we reset they;
 * </pre>
 * @param {string} userInfo auth user data
 * @param {number} time additional time to expires (default: 10 min)
 *
 * @memberof Helpers.cookiesHelpers
 */
export function setUserCookies(userInfo, time = 600_000) {
  document.cookie = `userInfo=${userInfo.toString()}; expires=${new Date(
    Date.now() + time
  ).toUTCString()}`;
  if (updateCookiesInterval) {
    clearInterval(updateCookiesInterval);
  }

  updateCookiesInterval = setInterval(() => {
    document.cookie = `${document.cookie}; expires=${new Date(
      Date.now() + time
    ).toUTCString()}`;
  }, time - 1);
}
