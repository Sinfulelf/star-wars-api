import React, { PureComponent } from "react";
import PT from "prop-types";

import {
  HeroDetailsPropTypes,
  PeoplePageDispaType,
} from "../../models/dataModels";

import { personCardConfig } from "./personCardConfig";

import { Header, Icon } from "semantic-ui-react";

import { HeroInfo } from "./HeroInfo";

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
    const {
      item,
      displayType,
      toggleFavoriteHero,
      favoriteHeroes,
      observerIndex,
      index,
      setObservedItemIndex,
    } = this.props;
    const { style, isActive, heartIconFilled } = this.state;

    const isFavorite = favoriteHeroes.indexOf(item.id) !== -1;
    const isObserved = index === observerIndex;

    return (
      <div
        className={`hero-card ${
          isActive || (isObserved && displayType === PeoplePageDispaType.list)
            ? "active"
            : ""
        } ${displayType}`}
        style={style}
      >
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
            onClick={() => {
              if (!isObserved) {
                setObservedItemIndex(index);
              }
            }}
          >
            {item.name}
          </Header>
          <Icon
            name="heart"
            className={`favor-icon ${
              isFavorite ? "red" : heartIconFilled ? "pale-red" : "outline"
            }`}
            onMouseEnter={(_) => this.setHeartIconFilled(true)}
            onMouseLeave={(_) => this.setHeartIconFilled(false)}
            onClick={() => {
              toggleFavoriteHero(item.id);
            }}
          />
          {displayType === PeoplePageDispaType.list && isObserved && (
            <Icon className="observer-caret" name="caret right" size="big" />
          )}
        </div>
        {displayType === PeoplePageDispaType.cards && (
          <HeroInfo item={item} cardView/>
        )}
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
  favoriteHeroes: PT.arrayOf(PT.number).isRequired,
  toggleFavoriteHero: PT.func.isRequired,
  observerIndex: PT.number.isRequired,
  setObservedItemIndex: PT.func.isRequired,
};

export const PersonCard = PersonCardItem;
