import { handleActions } from "redux-actions";
import { PeopleStore } from "../models/storeModels";
import { PeopleActions } from "../actions";

const {
  SET_PEOPLE_PAGE_LOADING_STATE,
  SET_PEOPLE_PAGE_DISPAY_TYPE,
  GET_PEOPLE_DATA,
  GET_HERO_INFO_DATA,
} = PeopleActions;

export const initialState = new PeopleStore();

export const peopleReducer = handleActions(
  {
    [SET_PEOPLE_PAGE_LOADING_STATE]: (peopleData, { payload }) => {
      const { state } = payload;

      return {
        ...peopleData,
        loading: state,
        timeStamp: Date.now(),
      };
    },
    [SET_PEOPLE_PAGE_DISPAY_TYPE]: (peopleData, { payload }) => {
      const { type } = payload;

      return {
        ...peopleData,
        dispayType: type,
        timeStamp: Date.now(),
      };
    },
    [GET_PEOPLE_DATA]: (peopleData, { payload }) => {
      const { data, count, page } = payload;

      const updatedPeopleList = data.reduce(
        (acc, item) => {
          if (item.id) {
            if (acc.findIndex((x) => x.id === item.id) === -1) {
              return [...acc, item];
            }
          }
          return acc;
        },
        [...peopleData.people]
      );
      const maxLimit = peopleData.itemsPerRequest * 3;
      const overLimit = updatedPeopleList.length - maxLimit;

      const cleanedUpdatedPeopleList =
        overLimit > 0
          ? updatedPeopleList
              .map((x, i) => (i >= overLimit ? x : null))
              .filter((x) => x)
          : updatedPeopleList;

      return {
        ...peopleData,
        totalPeopleCount: count,
        currentPage: page,
        people: cleanedUpdatedPeopleList,
        timeStamp: Date.now(),
      };
    },
    [GET_HERO_INFO_DATA]: (peopleData, { payload }) => {},
  },
  initialState
);
