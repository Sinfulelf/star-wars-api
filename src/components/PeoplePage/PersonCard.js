import React, { PureComponent } from "react";
import PT from "prop-types";

import {
  HeroDetailsPropTypes,
  PeoplePageDispaType,
} from "../../models/dataModels";

import { personCardConfig } from "./personCardConfig";

import { Header, Icon } from "semantic-ui-react";

class PersonCardItem extends PureComponent {
  state = {
    style: {},
    styleConditions: {
      displayType: "",
      index: -1,
      wrapperWidth: -1,
    },
    isActive: false,
    heartIconFilled: false,
  };

  stylesConfigs = {
    [PeoplePageDispaType.list]: {
      width: 200,
      height: 30,
      gap: 5,
    },
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (personCardConfig.shouldRecalculateStyle(nextProps, prevState)) {
      return {
        style: personCardConfig.recalculateStyle(nextProps),
        styleConditions: {
          displayType: nextProps.displayType,
          index: nextProps.index,
          wrapperWidth: nextProps.wrapperWidth,
        },
      };
    }
    return null;
  }

  setCardActiveState = (state) => {
    this.setState({
      isActive: state,
    });
  };

  setHeartIconFilled = (state) => {
    this.setState({
      heartIconFilled: state,
    });
  };

  render() {
    const { item } = this.props;
    const { style, isActive, heartIconFilled } = this.state;
    return (
      <div className={`hero-card ${isActive ? "active" : ""}`} style={style}>
        <div className="hero-card__header">
          <Header
            as="h3"
            title={item.name}
            className="hero-name"
            onMouseUp={(_) => {
              this.setCardActiveState(false);
            }}
            onMouseLeave={(_) => {
              this.setCardActiveState(false);
            }}
            onMouseDown={(_) => {
              this.setCardActiveState(true);
            }}
          >
            {item.name}
          </Header>
          <Icon
            name={`heart ${heartIconFilled ? "red" : "outline"}`}
            style={{ marginTop: heartIconFilled ? -2 : 0 }}
            className="favor-icon"
            onMouseEnter={(_) => this.setHeartIconFilled(true)}
            onMouseLeave={(_) => this.setHeartIconFilled(false)}
          />
        </div>
      </div>
    );
  }
}

PersonCardItem.propTypes = {
  wrapperWidth: PT.number.isRequired,
  index: PT.number.isRequired,
  displayType: PT.oneOf([PeoplePageDispaType.cards, PeoplePageDispaType.list])
    .isRequired,
  item: PT.shape(HeroDetailsPropTypes).isRequired,
};

export const PersonCard = PersonCardItem;
