import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Dimmer, Loader } from "semantic-ui-react";

import { RouteData } from "../../data";

import {
  setPeoplePageDispayType as setPeoplePageDispayTypeAction,
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
      await actions.getPeople(currentPage, true);
    }
  }

  getPaginationsItemsCount = () => {
    const { totalPeopleCount, itemsPerRequest } = this.props.data.peopleData;
    return !!totalPeopleCount
      ? Math.ceil(totalPeopleCount / itemsPerRequest)
      : 10;
  };

  showFavoriteOnly = (state) => {
    const { isFavorites } = this.props.data;
    if (isFavorites !== state) {
      this.props.history.push(state ? RouteData.Favorites : RouteData.People);
    }
  };

  render() {
    const { data, actions } = this.props;
    const { peopleData, isFavorites } = data;
    const { getPeople, setPeoplePageDispayType } = actions;

    const paginationsCount = this.getPaginationsItemsCount();
    return (
      <div className={`page-wrapper ${this.pageName}`}>
        {peopleData.loading && (
          <Dimmer active inverted className="p-absolute">
            <Loader inverted size="huge">Loading</Loader>
          </Dimmer>
        )}
        <PeoplePageHeader
          pageName={this.pageName}
          isFavorites={isFavorites}
          showFavoriteOnly={this.showFavoriteOnly}
          dispayType={peopleData.dispayType}
          setPeoplePageDispayType={setPeoplePageDispayType}
        />
        <PeoplePageContent pageName={this.pageName} />
        <PeoplePageFooter
          pageName={this.pageName}
          activePage={peopleData.currentPage}
          totalPages={paginationsCount}
          onPageChange={getPeople}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { pathname } = ownProps.location;
  const isFavorites = pathname === RouteData.Favorites;
  const { peopleData } = state;
  return {
    data: {
      peopleData,
      isFavorites,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      setPeoplePageDispayType: (type) => {
        dispatch(setPeoplePageDispayTypeAction(type));
      },
      getPeople: async (page, force) => {
        await dispatch(getPeopleDataAction(page, force));
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
