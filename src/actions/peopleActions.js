import { getData } from "../helpers";
import { StartWarsUrlData } from "../data";
import { HeroDetails } from "../models/dataModels";

export const PeopleActions = {
  SET_PEOPLE_PAGE_LOADING_STATE: "SET_PEOPLE_PAGE_LOADING_STATE",
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

const getPeopleDataDispatch = (data, count, page) => ({
  type: PeopleActions.GET_PEOPLE_DATA,
  payload: { data, count, page },
});

export function getPeopleData(page) {
  return async (dispatch, getState) => {
    const pageStr = (page || 1).toString();
    const { peopleData } = getState();
    if (pageStr !== peopleData.currentPage) {
      try {
        dispatch(setPeoplePageLoadingState(true));

        const { count, results } = await getData({
          baseUrl: StartWarsUrlData.GET_PEOPLE,
          query: { page },
        });
        if (results && results.length) {
          dispatch(
            getPeopleDataDispatch(
              results.map((x) => HeroDetails.new(x)),
              count,
              pageStr
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
    }
  };
}
