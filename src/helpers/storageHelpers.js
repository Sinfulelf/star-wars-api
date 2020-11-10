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