import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { getPeopleData as getPeopleDataAction } from "../../actions/peopleActions";

class PeoplePage extends PureComponent {
  async componentDidMount() {
    const { data, actions } = this.props;

    if (!data.peopleData.people.length) {
      await actions.getPeople(1);
    }
  }

  render() {
    return <div>123</div>;
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
    return (
      next.peopleData.timeStamp &&
      next.peopleData.timeStamp === prev.peopleData.timeStamp
    );
  },
})(PeoplePage);

export default PeoplePageComponent;
