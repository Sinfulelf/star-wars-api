import { handleActions } from "redux-actions";
import { PeopleStore } from "../models/storeModels";
import { PeopleActions } from "../actions";

const {
  SET_PEOPLE_PAGE_LOADING_STATE,
  SET_PEOPLE_PAGE_DISPAY_TYPE,
  SET_PEOPLE_PAGE_PAGINATION_PAGE,
  RESET_PEOPLE_DATA,
  CLEAR_PEOPLE_DATA,
  GET_PEOPLE_DATA,
  SET_PEOPLE_PAGE_FAVORITES_VIEW_MODE,
  TOGGLE_FAVORITE_HEROES,
  SET_OBSERVED_ITEM_INDEX,
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
        observerIndex: 0,
      };
    },
    [RESET_PEOPLE_DATA]: (peopleData, { payload }) => {
      return {
        ...peopleData,
        timeStamp: Date.now(),
        people: [],
        observerIndex: 0,
        currentPage: "1",
        uploadedPages: [],
      };
    },
    [CLEAR_PEOPLE_DATA]: (peopleData, { payload }) => {
      return new PeopleStore();
    },
    [GET_PEOPLE_DATA]: (peopleData, { payload }) => {
      const { data, count, page, search } = payload;

      const newUploadedPages = [...peopleData.uploadedPages, page];

      const clearUploadedPages = newUploadedPages.length > 3;

      const pageToClear = clearUploadedPages ? newUploadedPages.shift() : null;

      const updatedPeopleList = clearUploadedPages
        ? peopleData.people.map((x) => {
            if (x && x.fromPage === pageToClear) {
              return null;
            }
            return x;
          })
        : [...peopleData.people];

      const firstUpdateIndex = (page - 1) * peopleData.itemsPerPage;
      for (let i = 0; i < peopleData.itemsPerPage; i++) {
        if (data[i]) {
          updatedPeopleList[i + firstUpdateIndex] = {
            ...data[i],
            fromPage: page,
          };
        }
      }

      return {
        ...peopleData,
        observerIndex: 0,
        totalPeopleCount: count,
        currentPage: page,
        uploadedPages: newUploadedPages,
        people: updatedPeopleList,
        filterName: search,
        timeStamp: Date.now(),
      };
    },
    [SET_PEOPLE_PAGE_FAVORITES_VIEW_MODE]: (peopleData, { payload }) => {
      const { state } = payload;

      return {
        ...peopleData,
        timeStamp: Date.now(),
        showFavoritesOnly: state,
      };
    },
    [TOGGLE_FAVORITE_HEROES]: (peopleData, { payload }) => {
      const { ids } = payload;
      return {
        ...peopleData,
        timeStamp: Date.now(),
        favoriteHeroes: ids
          .reduce(
            (acc, id) => {
              const indexOfId = acc.indexOf(id);
              if (indexOfId === -1) {
                acc.push(id);
              } else {
                acc[indexOfId] = null;
              }
              return acc;
            },
            [...peopleData.favoriteHeroes]
          )
          .filter((x) => x !== null),
      };
    },
    [SET_OBSERVED_ITEM_INDEX]: (peopleData, { payload }) => {
      const { index } = payload;
      return {
        ...peopleData,
        observerIndex: index,
        timeStamp: Date.now(),
      };
    },
  },
  initialState
);
