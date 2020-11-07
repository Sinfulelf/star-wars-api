import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { getPeopleData as getPeopleDataAction } from "../../actions/peopleActions";

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
    const { totalPeopleCount, itemsPerRequest } = this.props.data.peopleData;
    return !!totalPeopleCount
      ? Math.ceil(totalPeopleCount / itemsPerRequest)
      : 10;
  };

  render() {
    const { data, actions } = this.props;
    const { peopleData } = data;
    const { getPeople } = actions;

    const paginationsCount = this.getPaginationsItemsCount();
    return (
      <div className="page-wrapper">
        <PeoplePageHeader pageName={this.pageName} />
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
  const { peopleData } = state;
  return {
    data: {
      peopleData,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      getPeople: async (page) => {
        await dispatch(getPeopleDataAction(page));
      },
    },
  };
};

const PeoplePageComponent = connect(mapStateToProps, mapDispatchToProps, null, {
  areStatesEqual: (next, prev) => {
    //update page only when peopleData change
    return !!(
      !next.peopleData.timeStamp ||
      next.peopleData.timeStamp === prev.peopleData.timeStamp
    );
  },
})(PeoplePage);

export default PeoplePageComponent;
