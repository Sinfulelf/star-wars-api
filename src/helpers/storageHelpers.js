/**
 * LocalStorage helpers functions;
 * @memberof Helpers
 * @namespace Helpers.storageHelpers
 */

const favoritesHeroesKey = "star-wars-api-favorites-heroes";
/**
 * Get favorites heroes from localStorage;
 *
 * @returns {Array<number>} array of heroes ids
 * 
 * @memberof Helpers.storageHelpers
 */
export function getFavoritesHeroesToStorage() {
  const favoritesHeroes = localStorage.getItem(favoritesHeroesKey);
  if (favoritesHeroes) {
    return JSON.parse(favoritesHeroes);
  }
  return [];
}

/**
 * Set favorites heroes to localStorage;
 * @param {Array<numbers>} ids array of favorite heroes ids
 * 
 * @memberof Helpers.storageHelpers
 */
export function setFavoritesHeroesToStorage(ids) {
  localStorage.setItem(favoritesHeroesKey, JSON.stringify(ids));
}
