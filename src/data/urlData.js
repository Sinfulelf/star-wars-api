const baseStarWarsAPIUrl = "https://swapi.dev/api";

export const StarWarsUrlData = {
  GET_PEOPLE: `${baseStarWarsAPIUrl}/people/`,
  GET_PLANET: `${baseStarWarsAPIUrl}/planets/`,
  GET_FILM: `${baseStarWarsAPIUrl}/films/`,
};

export const StartWarsUrlGetIdRegEx = {
  GET_PEOPLE_REGEX: /people\/(.*)/,
  GET_PLANET_REGEX: /planets\/(.*)/,
  GET_FILM_REGEX: /films\/(.*)/,
};
