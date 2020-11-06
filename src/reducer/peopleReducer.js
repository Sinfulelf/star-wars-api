import { handleActions } from "redux-actions";
import { PeopleStore } from "../models/storeModels";
import { PeopleActions } from "../actions";

const { GET_PEOPLE_DATA, GET_HERO_INFO_DATA } = PeopleActions;

export const initialState = new PeopleStore();

export const peopleReducer = handleActions(
  {
    [GET_PEOPLE_DATA]: (peopleData, { payload }) => {
      const { data, count, page } = payload;
      return {
        ...peopleData,
        totalPeopleCount: count,
        uploadedPages: [...peopleData.uploadedPages, page],
        people: data.reduce(
          (acc, item) => {
            if (item.id) {
              if (acc.findIndex((x) => x.id === item.id) === -1) {
                return [...acc, item];
              }
            }
            return acc;
          },
          [...peopleData.people]
        ),
      };
    },
    [GET_HERO_INFO_DATA]: (peopleData, { payload }) => {},
  },
  initialState
);
