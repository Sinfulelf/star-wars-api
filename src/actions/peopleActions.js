import { getData } from "../helpers";
import { StartWarsUrlData } from "../data";
import { HeroDetails } from "../models/dataModels";

import {
  getFavoritesHeroesToStorage,
  setFavoritesHeroesToStorage,
} from "../helpers";

export const PeopleActions = {
  SET_PEOPLE_PAGE_LOADING_STATE: "SET_PEOPLE_PAGE_LOADING_STATE",
  SET_PEOPLE_PAGE_DISPAY_TYPE: "SET_PEOPLE_PAGE_DISPAY_TYPE",
  SET_PEOPLE_PAGE_PAGINATION_PAGE: "SET_PEOPLE_PAGE_PAGINATION_PAGE",
  RESET_PEOPLE_DATA: "RESET_PEOPLE_DATA",
  CLEAR_PEOPLE_DATA: "CLEAR_PEOPLE_DATA",
  GET_PEOPLE_DATA: "GET_PEOPLE_DATA",

  TOGGLE_FAVORITE_HEROES: "TOGGLE_FAVORITE_HEROES",
  SET_OBSERVED_ITEM_INDEX: "SET_OBSERVED_ITEM_INDEX",
};

const setPeoplePageLoadingStateDispatch = (state) => ({
  type: PeopleActions.SET_PEOPLE_PAGE_LOADING_STATE,
  payload: { state },
});

function setPeoplePageLoadingState(state) {
  return (dispatch) => {
    dispatch(setPeoplePageLoadingStateDispatch(state));
  };
}

const setPeoplePagedisplayTypeDispatch = (type) => ({
  type: PeopleActions.SET_PEOPLE_PAGE_DISPAY_TYPE,
  payload: { type },
});

export function setPeoplePagedisplayType(type) {
  return async (dispatch, getState) => {
    const { peopleData } = getState();
    if (peopleData.displayType !== type) {
      dispatch(setPeoplePagedisplayTypeDispatch(type));
    }
  };
}

const setPeoplePagePaginationPageDispatch = (page) => ({
  type: PeopleActions.SET_PEOPLE_PAGE_PAGINATION_PAGE,
  payload: { page },
});

const resetPeopleData = () => ({
  type: PeopleActions.RESET_PEOPLE_DATA,
});

const clearPeopleDataDispatch = () => ({
  type: PeopleActions.CLEAR_PEOPLE_DATA,
});

export function clearPeopleData() {
  return (dispatch) => {
    dispatch(clearPeopleDataDispatch());
  };
}

const getPeopleDataDispatch = (data, count, page, search) => ({
  type: PeopleActions.GET_PEOPLE_DATA,
  payload: { data, count, page, search },
});

export function getPeopleData(page, search) {
  return async (dispatch, getState) => {
    const pageStr = (page || 1).toString();
    const { peopleData } = getState();
    const newSearch = search !== peopleData.filterName;
    if (newSearch) {
      dispatch(resetPeopleData());
    }

    if (newSearch || peopleData.uploadedPages.indexOf(pageStr) === -1) {
      try {
        dispatch(setPeoplePageLoadingState(true));

        const query = { page };
        if (search) query.search = search;

        const { count, results } = await getData({
          baseUrl: StartWarsUrlData.GET_PEOPLE,
          query,
        });
        if (results) {
          dispatch(
            getPeopleDataDispatch(
              results.map((x) => HeroDetails.new(x)),
              count,
              pageStr,
              search
            )
          );
        } else {
          const exMessage = "No data from response";
          throw exMessage;
        }
      } catch (ex) {
        console.log(ex);
        //todo Add message about exception
      } finally {
        dispatch(setPeoplePageLoadingState(false));
      }
    } else {
      dispatch(setPeoplePagePaginationPageDispatch(pageStr));
    }
  };
}

const toggleFavoritesHeroesDispatch = (ids) => ({
  type: PeopleActions.TOGGLE_FAVORITE_HEROES,
  payload: { ids },
});
export function toggleFavoritesHeroes(ids) {
  return (dispatch, getState) => {
    dispatch(toggleFavoritesHeroesDispatch(ids));
    const { userInfo } = getState();
    if (userInfo.offlineMode) {
      const { peopleData } = getState();
      setFavoritesHeroesToStorage(peopleData.favoriteHeroes);
    }
  };
}

export function getFavoriteHeroes() {
  return async (dispatch, getState) => {
    const { userInfo } = getState();
    if (userInfo.offlineMode) {
      dispatch(toggleFavoritesHeroesDispatch(getFavoritesHeroesToStorage()));
    }
  };
}

const setObservedItemIndexDispatch = (index) => ({
  type: PeopleActions.SET_OBSERVED_ITEM_INDEX,
  payload: { index },
});
export function setObservedItemIndex(index) {
  return (dispatch) => {
    dispatch(setObservedItemIndexDispatch(index));
  };
}
