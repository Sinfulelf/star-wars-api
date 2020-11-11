import { getData } from "../helpers";
import { StarWarsUrlData } from "../data";
import { HeroDetails } from "../models/dataModels";

import {
  firebaseDb,
  getFavoritesHeroesFromStorage,
  setFavoritesHeroesToStorage,
} from "../helpers";

export const PeopleActions = {
  SET_PEOPLE_PAGE_LOADING_STATE: "SET_PEOPLE_PAGE_LOADING_STATE",
  SET_PEOPLE_PAGE_DISPAY_TYPE: "SET_PEOPLE_PAGE_DISPAY_TYPE",
  SET_PEOPLE_PAGE_PAGINATION_PAGE: "SET_PEOPLE_PAGE_PAGINATION_PAGE",
  RESET_PEOPLE_DATA: "RESET_PEOPLE_DATA",
  CLEAR_PEOPLE_DATA: "CLEAR_PEOPLE_DATA",
  GET_PEOPLE_DATA: "GET_PEOPLE_DATA",
  UPDATE_HERO_DATA: "UPDATE_HERO_DATA",
  SET_PEOPLE_PAGE_FAVORITES_VIEW_MODE: "SET_PEOPLE_PAGE_FAVORITES_VIEW_MODE",

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

const resetPeopleDataDispatch = () => ({
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
      dispatch(resetPeopleDataDispatch());
    }
    if (!peopleData.showFavoritesOnly) {
      if (newSearch || peopleData.uploadedPages.indexOf(pageStr) === -1) {
        try {
          dispatch(setPeoplePageLoadingState(true));

          const query = { page };
          if (search) query.search = search;

          const { count, results } = await getData({
            baseUrl: StarWarsUrlData.GET_PEOPLE,
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
          console.log("ex", ex);
          //todo Add message about exception
        } finally {
          dispatch(setPeoplePageLoadingState(false));
        }
      } else {
        dispatch(setPeoplePagePaginationPageDispatch(pageStr));
      }
    } else {
      await dispatch(getPeopleFavoriteData(page, search));
    }
  };
}

const setPeoplePageFavoritesViewModeDispatch = (state) => ({
  type: PeopleActions.SET_PEOPLE_PAGE_FAVORITES_VIEW_MODE,
  payload: { state },
});
export function setPeoplePageFavoritesViewMode(state) {
  return async (dispatch, getState) => {
    dispatch(setPeoplePageFavoritesViewModeDispatch(state));

    const { peopleData } = getState();
    const { filterName } = peopleData;
    if (state) {
      await dispatch(getPeopleFavoriteData(1, filterName));
    } else {
      //dispatch(resetPeopleDataDispatch());
      await dispatch(getPeopleData(1, filterName));
    }
  };
}

const toggleFavoritesHeroesDispatch = (items) => ({
  type: PeopleActions.TOGGLE_FAVORITE_HEROES,
  payload: { items },
});
export function toggleFavoritesHeroes(items) {
  return async (dispatch, getState) => {
    dispatch(toggleFavoritesHeroesDispatch(items));
    const { userInfo, peopleData } = getState();
    if (userInfo.offlineMode) {
      setFavoritesHeroesToStorage(peopleData.favoriteHeroes);
    } else {
      const { user } = userInfo;
      if (user && user.uid) {
        try {
          firebaseDb
            .ref(user.uid)
            .set(JSON.stringify(peopleData.favoriteHeroes));
        } catch (ex) {
          console.log(ex);
        }
      }
    }
    if (peopleData.showFavoritesOnly) {
      setTimeout(() => {
        const { currentPage, filterName } = peopleData;
        dispatch(getPeopleFavoriteData(currentPage, filterName));
      });
    }
  };
}

export function getFavoriteHeroes() {
  return async (dispatch, getState) => {
    const { userInfo } = getState();
    if (userInfo.offlineMode) {
      const favorites = getFavoritesHeroesFromStorage();
      dispatch(toggleFavoritesHeroesDispatch(favorites || {}));
    } else {
      const { user } = userInfo;
      if (user && user.uid) {
        try {
          const value = await firebaseDb.ref(user.uid).once("value");
          if (value && value.val) {
            const favorites = value.val();
            if (favorites)
              dispatch(toggleFavoritesHeroesDispatch(JSON.parse(favorites)));
            else
            dispatch(toggleFavoritesHeroesDispatch({}));
          }
        } catch (ex) {
          console.log(ex);
        }
      }
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

function getPeopleFavoriteData(page, search) {
  return async (dispatch, getState) => {
    const { peopleData } = getState();
    const { favoriteHeroes, people, itemsPerPage } = peopleData;

    try {
      dispatch(setPeoplePageLoadingState(true));
      const filterName = (search || "").toLowerCase();
      const filteredItems = Object.keys(favoriteHeroes || {})
        .map((key) => ({ id: Number(key), name: (favoriteHeroes || {})[key] }))
        .filter(
          (x) =>
            x &&
            (x.name || "").toString().toLowerCase().indexOf(filterName) !== -1
        );

      const idsPerPage = filteredItems.slice(
        itemsPerPage * (page - 1),
        itemsPerPage * page
      );
      if (!idsPerPage.length && page > 1) {
        await dispatch(getPeopleFavoriteData(page - 1, search));
      } else {
        const itemsToUpload = [];
        const items = [];

        for (let i of idsPerPage) {
          const item = people.find((x) => x && x.id === i.id);
          if (item) {
            items.push(item);
          } else {
            itemsToUpload.push(i.id);
            const mockItem = new HeroDetails();
            mockItem.id = i.id;
            mockItem.name = i.name;
            mockItem.loaded = false;
            items.push(mockItem);
          }
        }

        dispatch(
          getPeopleDataDispatch(
            items,
            Object.keys(filteredItems).length,
            page.toString(),
            search
          )
        );
        dispatch(setPeoplePageLoadingState(false));
        for (let id of itemsToUpload) {
          await dispatch(updateHeroData(id));
        }
      }
    } catch (ex) {
      console.log("ex", ex);
      //todo Add message about exception
      dispatch(setPeoplePageLoadingState(false));
    }
  };
}

const updateHeroDataDispatch = (hero) => ({
  type: PeopleActions.UPDATE_HERO_DATA,
  payload: { hero },
});

function updateHeroData(id) {
  return async (dispatch) => {
    try {
      const data = await getData({
        baseUrl: StarWarsUrlData.GET_PEOPLE,
        param: id,
      });

      const hero = HeroDetails.new(data);
      dispatch(updateHeroDataDispatch(hero));
    } catch (ex) {
      console.log("ex", ex);
      //todo Add message about exception
    }
  };
}
