const baseStarWarsAPIUrl = process.env.REACT_APP_STARWARS_API_URL;

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