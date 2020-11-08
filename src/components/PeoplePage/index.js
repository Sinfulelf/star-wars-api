import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { RouteData } from "../../data";

import {
  setPeoplePagedisplayType as setPeoplePagedisplayTypeAction,
  getPeopleData as getPeopleDataAction,
} from "../../actions/peopleActions";

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
    }
  }

  getPaginationsItemsCount = () => {
    const { totalPeopleCount, itemsPerPage } = this.props.data.peopleData;
    return !!totalPeopleCount ? Math.ceil(totalPeopleCount / itemsPerPage) : 10;
  };

  onPaginationPageChange = async (page) => {
    const { data, actions } = this.props;
    if (data.peopleData.currentPage != page) {
      await actions.getPeople(page, data.peopleData.filterName);
    }
  };

  showFavoriteOnly = (state) => {
    const { isFavorites } = this.props.data;
    if (isFavorites !== state) {
      this.props.history.push(state ? RouteData.Favorites : RouteData.People);
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
    const { peopleData, isFavorites, paginatedData } = data;
    const { setPeoplePagedisplayType } = actions;

    const paginationsCount = this.getPaginationsItemsCount();
    return (
      <div className={`page-wrapper ${this.pageName}`}>
        <PeoplePageHeader
          pageName={this.pageName}
          isFavorites={isFavorites}
          showFavoriteOnly={this.showFavoriteOnly}
          displayType={peopleData.displayType}
          setPeoplePagedisplayType={setPeoplePagedisplayType}
          search={this.filterByName}
        />
        <PeoplePageContent
          pageName={this.pageName}
          loading={peopleData.loading}
          isFavorites={isFavorites}
          displayType={peopleData.displayType}
          data={paginatedData}
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
  const { pathname } = ownProps.location;
  const isFavorites = pathname === RouteData.Favorites;
  const { peopleData } = state;

  const { people, currentPage } = peopleData;

  const paginatedData = people.filter((x) => x && x.fromPage === currentPage);

  return {
    data: {
      peopleData,
      isFavorites,
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
    return !!(
      !next.peopleData.timeStamp ||
      next.peopleData.timeStamp === prev.peopleData.timeStamp
    );
  },
})(PeoplePage);

export default withRouter((props) => <PeoplePageComponent {...props} />);
