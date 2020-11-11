import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { HeroDetails } from "../../models/dataModels";

import {
  setPeoplePagedisplayType as setPeoplePagedisplayTypeAction,
  getPeopleData as getPeopleDataAction,
  clearPeopleData as clearPeopleDataAction,
  toggleFavoritesHeroes as toggleFavoritesHeroesAction,
  getFavoriteHeroes as getFavoriteHeroesAction,
  setObservedItemIndex as setObservedItemIndexAction,
  setPeoplePageFavoritesViewMode as setPeoplePageFavoritesViewModeAction,
  setSelectedCardItem as setSelectedCardItemAction,
} from "../../actions/peopleActions";

import {
  getFilmData as getFilmDataAction,
  getPlanetData as getPlanetDataAction,
} from "../../actions/relationshipsActions";

import { PeoplePageHeader } from "./Header";
import { PeoplePageContent } from "./Content";
import { PeoplePageFooter } from "./Footer";

class PeoplePage extends PureComponent {
  pageName = "people-page";

  async componentDidMount() {
    const { data, actions } = this.props;
    const { people, currentPage } = data.peopleData;
    if (!people.length) {
      await actions.getPeople(currentPage);
      await actions.getFavoriteHeroes();
    }
  }

  componentWillUnmount() {
    this.props.actions.clearPeopleData();
  }

  getPaginationsItemsCount = () => {
    const { totalPeopleCount, itemsPerPage } = this.props.data.peopleData;
    return !!totalPeopleCount ? Math.ceil(totalPeopleCount / itemsPerPage) : 10;
  };

  onPaginationPageChange = async (page) => {
    if (page || page === 0) {
      const { data, actions } = this.props;
      if (data.peopleData.currentPage !== page.toString()) {
        await actions.getPeople(page, data.peopleData.filterName);
      }
    }
  };

  showFavoriteOnly = (state) => {
    const { showFavoritesOnly } = this.props.data.peopleData;
    if (showFavoritesOnly !== state) {
      this.props.actions.setPeoplePageFavoritesViewMode(state);
    }
  };

  filterByName = async (value) => {
    const { data, actions } = this.props;
    if (data.peopleData.filterName !== value) {
      await actions.getPeople(1, value);
    }
  };

  render() {
    const { data, actions } = this.props;
    const { peopleData, relationships, paginatedData } = data;
    const {
      setPeoplePagedisplayType,
      toggleFavoriteHero,
      setObservedItemIndex,
      getFilmData,
      getPlanetData,
      setSelectedCardItem,
    } = actions;

    const paginationsCount = this.getPaginationsItemsCount();
    return (
      <div className={`page-wrapper ${this.pageName}`}>
        <PeoplePageHeader
          pageName={this.pageName}
          isFavorites={peopleData.showFavoritesOnly}
          showFavoriteOnly={this.showFavoriteOnly}
          displayType={peopleData.displayType}
          setPeoplePagedisplayType={setPeoplePagedisplayType}
          search={this.filterByName}
        />
        <PeoplePageContent
          pageName={this.pageName}
          loading={peopleData.loading}
          isFavorites={peopleData.showFavoritesOnly}
          displayType={peopleData.displayType}
          data={paginatedData}
          favoriteHeroes={peopleData.favoriteHeroes}
          toggleFavoriteHero={toggleFavoriteHero}
          observerIndex={peopleData.observerIndex}
          setObservedItemIndex={setObservedItemIndex}
          getFilmData={getFilmData}
          getPlanetData={getPlanetData}
          relationships={relationships}
          setSelectedCardItem={setSelectedCardItem}
          selectedCardId={peopleData.selectedCardId}
        />
        <PeoplePageFooter
          pageName={this.pageName}
          loading={peopleData.loading}
          activePage={peopleData.currentPage}
          totalPages={paginationsCount}
          onPageChange={this.onPaginationPageChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { peopleData, relationships } = state;

  const { people, currentPage, itemsPerPage } = peopleData;

  //const paginatedData = people.filter((x) => x && x.fromPage === currentPage);

  const paginatedData = people
    .slice(itemsPerPage * (currentPage - 1), itemsPerPage * currentPage)
    .filter((x) => typeof x !== "undefined")
    .map((x) => x || new HeroDetails());

  return {
    data: {
      peopleData,
      relationships,
      paginatedData,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      setPeoplePagedisplayType: (type) => {
        dispatch(setPeoplePagedisplayTypeAction(type));
      },
      getPeople: async (page, search = "") => {
        await dispatch(getPeopleDataAction(page, search));
      },
      clearPeopleData: () => {
        dispatch(clearPeopleDataAction());
      },
      toggleFavoriteHero: (id, name) => {
        dispatch(toggleFavoritesHeroesAction({ [id]: name }));
      },
      getFavoriteHeroes: async () => {
        await dispatch(getFavoriteHeroesAction());
      },
      setObservedItemIndex: (index) => {
        dispatch(setObservedItemIndexAction(index));
      },
      setPeoplePageFavoritesViewMode: (state) => {
        dispatch(setPeoplePageFavoritesViewModeAction(state));
      },
      getFilmData: async (id) => {
        await dispatch(getFilmDataAction(id));
      },
      getPlanetData: async (id) => {
        await dispatch(getPlanetDataAction(id));
      },
      setSelectedCardItem: (id) => {
        dispatch(setSelectedCardItemAction(id));
      },
    },
  };
};

const PeoplePageComponent = connect(mapStateToProps, mapDispatchToProps, null, {
  pure: true,
  areOwnPropsEqual: (nextOwnProps, ownProps) => {
    return nextOwnProps.location.pathname === ownProps.location.pathname;
  },
  areStatesEqual: (next, prev) => {
    //update page only when peopleData change
    return (
      !!next.peopleData.timeStamp &&
      next.peopleData.timeStamp === prev.peopleData.timeStamp &&
      next.relationships.timeStamp === prev.relationships.timeStamp
    );
  },
})(PeoplePage);

export default withRouter((props) => <PeoplePageComponent {...props} />);
