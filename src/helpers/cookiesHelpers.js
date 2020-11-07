import { UserInfoStore } from "../models/storeModels";

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
const userInfoKey = "userInfo";
/**
 * Set user data to cookies;
 * <pre>
 * - When cookie expires and session is actiove, we reset they;
 * </pre>
 * @param {string} userInfo auth user stringified data
 * @param {number} time additional time to expires (default: 10 min)
 *
 * @memberof Helpers.cookiesHelpers
 */
export function setUserCookies(userInfo, time = 600_000) {
  document.cookie = `${userInfoKey}=${userInfo}; expires=${setTimeForCookies(
    time
  )}`;
  if (updateCookiesInterval) {
    clearInterval(updateCookiesInterval);
  }

  if (time) {
    updateCookiesInterval = setInterval(() => {
      document.cookie = `${document.cookie}; expires=${setTimeForCookies(
        time
      )}`;
    }, time * 0.8);
  }
}

function setTimeForCookies(seconds) {
  var now = new Date();
  var time = now.getTime();

  time += seconds * 1000;
  now.setTime(time);
  return now;
}

/**
 * Get user Info data from cookies; (code from `w3schools`)
 *
 * @returns instanse of userInfo
 * @memberof Helpers.cookiesHelpers
 */
export function getUserInfoFromCookie() {
  try {
    if (checkCookiesOnExists()) {
      const ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1);
        }
        if (c.indexOf(userInfoKey) === 0) {
          return JSON.parse(c.substring(userInfoKey.length + 1, c.length));
        }
      }
    }
  } catch (ex) {
    console.log(`getUserInfoFromCookie exception: ${ex}`);
  }
  return new UserInfoStore();
}
