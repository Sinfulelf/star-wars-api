/**
 * LocalStorage helpers functions;
 * @memberof Helpers
 * @namespace Helpers.storageHelpers
 */

const favoritesHeroesKey = "star-wars-api-favorites-heroes";
/**
 * Get favorites heroes from localStorage;
 *
 * @returns {Object} id-name of heroes
 *
 * @memberof Helpers.storageHelpers
 */
export function getFavoritesHeroesFromStorage() {
  const favoritesHeroes = localStorage.getItem(favoritesHeroesKey);
  if (favoritesHeroes) {
    return JSON.parse(favoritesHeroes);
  }
  return [];
}

/**
 * Set favorites heroes to localStorage;
 * @param {Object} items id-name of favorite heroes
 *
 * @memberof Helpers.storageHelpers
 */
export function setFavoritesHeroesToStorage(items) {
  localStorage.setItem(favoritesHeroesKey, JSON.stringify(items));
}

const userInfoFirebase = "star-wars-api-user-info";
/**
 * Set firebase auth user to localstorage;
 * @param {Object} userInfo firebase auth user
 * 
 * @memberof Helpers.storageHelpers
 */
export function setFirebaseAuthInfo(userInfo) {
  localStorage.setItem(userInfoFirebase, JSON.stringify(userInfo));
}
/**
 * Get firebase auth info from localstorage;
 * 
 * @returns {Object} firebase auth info
 * 
 * @memberof Helpers.storageHelpers
 */
export function getFirebaseUserInfo() {
  const data = localStorage.getItem(userInfoFirebase);
  if (data) {
    return JSON.parse(data);
  }
  return null;
}
/**
 * Remove irebase auth info from localstorage;
 */
export function clearFirebaseAuthInfo() {
  localStorage.removeItem(userInfoFirebase);
}