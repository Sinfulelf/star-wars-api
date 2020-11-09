import { handleActions } from "redux-actions";
import { RelationshipsStore } from "../models/storeModels";
import { RelationshipsActions } from "../actions";

const { GET_FILM_DATA, GET_PLANET_DATA } = RelationshipsActions;

export const initialState = new RelationshipsStore();

export const relationshipsReducer = handleActions(
  {
    [GET_FILM_DATA]: (relationshipsData, { payload }) => {
      const { film } = payload;
      return {
        ...relationshipsData,
        timeStamp: Date.now(),
        filmsData: {
          ...relationshipsData.filmsData,
          [film.id]: film,
        },
      };
    },
    [GET_PLANET_DATA]: (relationshipsData, { payload }) => {
      const { planet } = payload;
      return {
        ...relationshipsData,
        timeStamp: Date.now(),
        planestsData: {
          ...relationshipsData.planestsData,
          [planet.id]: planet,
        },
      };
    },
  },
  initialState
);
