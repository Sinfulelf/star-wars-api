import { handleActions } from "redux-actions";
import { PeopleStore } from "../models/storeModels";
import { PeopleActions } from "../actions";

const {
  SET_PEOPLE_PAGE_LOADING_STATE,
  SET_PEOPLE_PAGE_DISPAY_TYPE,
  SET_PEOPLE_PAGE_PAGINATION_PAGE,
  RESET_PEOPLE_DATA,
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
        displayType: type,
        timeStamp: Date.now(),
      };
    },
    [SET_PEOPLE_PAGE_PAGINATION_PAGE]: (peopleData, { payload }) => {
      const { page } = payload;

      return {
        ...peopleData,
        currentPage: page,
        timeStamp: Date.now(),
      };
    },
    [RESET_PEOPLE_DATA]: (peopleData, { payload }) => {
      return {
        ...new PeopleStore(),
        itemsPerPage: peopleData.itemsPerPage,
        displayType: peopleData.displayType,
        filterName: peopleData.filterName,
        timeStamp: Date.now(),
      };
    },
    [GET_PEOPLE_DATA]: (peopleData, { payload }) => {
      const { data, count, page, search } = payload;

      const newUploadedPages = [...peopleData.uploadedPages, page];

      const clearUploadedPages = newUploadedPages.length > 3;

      const pageToClear = clearUploadedPages ? newUploadedPages.shift() : null;

      const clearUploadedPeople = clearUploadedPages
        ? peopleData.people.map((x) => {
            if (x && x.fromPage === pageToClear) {
              return null;
            }
            return x;
          })
        : peopleData.people;

      const updatedPeopleList = data.reduce(
        (acc, item) => {
          if (item && item.id) {
            if (acc.findIndex((x) => x && x.id === item.id) === -1) {
              return [...acc, { ...item, fromPage: page }];
            }
          }
          return acc;
        },
        [...clearUploadedPeople]
      );
      return {
        ...peopleData,
        totalPeopleCount: count,
        currentPage: page,
        uploadedPages: newUploadedPages,
        people: updatedPeopleList,
        filterName: search,
        timeStamp: Date.now(),
      };
    },
    [GET_HERO_INFO_DATA]: (peopleData, { payload }) => {},
  },
  initialState
);
