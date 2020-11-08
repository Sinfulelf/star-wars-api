import { getData } from "../helpers";
import { StartWarsUrlData } from "../data";
import { HeroDetails } from "../models/dataModels";

export const PeopleActions = {
  SET_PEOPLE_PAGE_LOADING_STATE: "SET_PEOPLE_PAGE_LOADING_STATE",
  SET_PEOPLE_PAGE_DISPAY_TYPE: "SET_PEOPLE_PAGE_DISPAY_TYPE",
  SET_PEOPLE_PAGE_PAGINATION_PAGE: "SET_PEOPLE_PAGE_PAGINATION_PAGE",
  RESET_PEOPLE_DATA: "RESET_PEOPLE_DATA",
  GET_PEOPLE_DATA: "GET_PEOPLE_DATA",
  GET_HERO_INFO_DATA: "GET_HERO_INFO_DATA",
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

        const { count, results } = await getData({
          baseUrl: StartWarsUrlData.GET_PEOPLE,
          query: { page, search: search },
        });
        if (results && results.length) {
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
