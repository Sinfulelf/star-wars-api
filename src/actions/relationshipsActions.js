import { getData } from "../helpers";
import { StarWarsUrlData } from "../data";

import { FilmDetail, PlanetDetails } from "../models/dataModels";

export const RelationshipsActions = {
  GET_FILM_DATA: "GET_FILM_DATA",
  GET_PLANET_DATA: "GET_PLANET_DATA",
};

const getFilmDataDispatch = (film) => ({
  type: RelationshipsActions.GET_FILM_DATA,
  payload: { film },
});

export function getFilmData(id) {
  return async (dispatch, getState) => {
    const { relationships } = getState();
    if (!(id in relationships.filmsData)) {
      try {
        const { title, url, release_date } = await getData({
          baseUrl: StarWarsUrlData.GET_FILM,
          param: id,
        });
        if (title) {
          const model = new FilmDetail(url);
          model.title = title;
          model.releaseDate = release_date;

          dispatch(getFilmDataDispatch(model));
        }
      } catch (ex) {
        console.warn(ex);
        //todo Add message about exception
      }
    }
  };
}

const getPlanetDataDispatch = (planet) => ({
  type: RelationshipsActions.GET_PLANET_DATA,
  payload: { planet },
});

export function getPlanetData(id) {
  return async (dispatch, getState) => {
    const { relationships } = getState();
    if (!(id in relationships.planestsData)) {
      try {
        const {
          url,
          name,
          population,
          climate
        } = await getData({
          baseUrl: StarWarsUrlData.GET_PLANET,
          param: id,
        });
        if(name) {
          const model = new PlanetDetails(url);
          model.name = name;
          model.population = population;
          model.climate = climate;

          dispatch(getPlanetDataDispatch(model));
        }
      } catch (ex) {
        console.warn(ex);
        //todo Add message about exception
      }
    }
  };
}
