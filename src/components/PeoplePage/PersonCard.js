import React, { PureComponent } from "react";
import PT from "prop-types";

import { RelationshipsStorePropTypes } from "../../models/storeModels";

import {
  HeroDetailsPropTypes,
  PeoplePageDispaType,
} from "../../models/dataModels";

import { personCardConfig } from "./personCardConfig";

import { Header, Icon, Dimmer, Loader, Divider } from "semantic-ui-react";

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
    const selectedState = PersonCardItem.recalculateSelectedState(
      nextProps,
      prevState
    );

    if (personCardConfig.shouldRecalculateStyle(nextProps, prevState)) {
      return {
        style: personCardConfig.recalculateStyle(nextProps),
        styleConditions: {
          displayType: nextProps.displayType,
          index: nextProps.index,
          wrapperWidth: nextProps.wrapperWidth,
        },
        ...selectedState,
      };
    }
    return selectedState;
  }

  static recalculateSelectedState(nextProps, prevState) {
    const { displayType, item, selectedCardId } = nextProps;
    if (displayType === PeoplePageDispaType.cards) {
      if (
        item &&
        item.id &&
        !prevState.isSelected &&
        selectedCardId === item.id
      ) {
        return {
          isSelected: true,
        };
      } else if (
        !item ||
        !item.id ||
        (prevState.isSelected && selectedCardId !== item.id)
      ) {
        return {
          isSelected: false,
        };
      }
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isSelected !== this.state.isSelected) {
      setTimeout(() => {
        this.forceUpdate();
      }, 180);
    }
  }

  setCardActiveState = (state) => {
    const { displayType } = this.props;
    if (displayType === PeoplePageDispaType.list)
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
      setSelectedCard,
      relationships,
      getFilmData,
      getPlanetData,
      wrapperRef,
    } = this.props;
    const { style, isActive, heartIconFilled, isSelected } = this.state;

    const favoritesNotUploaded = favoriteHeroes === null;
    const isFavorite = !!(favoriteHeroes || {})[item.id];
    const isObserved = index === observerIndex;
    const itemCardIdSelected = isSelected;

    return (
      <div
        className={`hero-card ${
          isActive || (isObserved && displayType === PeoplePageDispaType.list)
            ? "active"
            : ""
        } ${displayType} ${itemCardIdSelected ? "selected" : ""}`}
        style={
          itemCardIdSelected
            ? personCardConfig.selectedCardStyle(wrapperRef)
            : style
        }
        onClick={() => {
          if (!isObserved && displayType === PeoplePageDispaType.list) {
            setObservedItemIndex(index);
          }
          if (
            !itemCardIdSelected &&
            displayType === PeoplePageDispaType.cards
          ) {
            setSelectedCard(item.id);
          }
        }}
      >
        {!item.loaded && (
          <Dimmer active inverted className="p-absolute">
            <Loader inverted size="small" />
          </Dimmer>
        )}
        <div className="hero-card__header">
          <div className="hero-card__header__data">
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
            <Icon.Group>
              <Icon
                name="heart"
                className={`favor-icon ${
                  isFavorite ? "red" : heartIconFilled ? "pale-red" : "outline"
                }`}
                disabled={favoritesNotUploaded}
                onMouseEnter={(_) => this.setHeartIconFilled(true)}
                onMouseLeave={(_) => this.setHeartIconFilled(false)}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavoriteHero(item.id, item.name);
                }}
              />
              {favoritesNotUploaded && (
                <Icon
                  size="small"
                  loading
                  name="circle notch"
                  className="favor-icon-loading"
                />
              )}
            </Icon.Group>
          </div>
          {displayType === PeoplePageDispaType.list && isObserved && (
            <Icon className="observer-caret" name="caret right" size="big" />
          )}
          {itemCardIdSelected && (
            <Icon
              name="x"
              size="large"
              className="hover-active-item"
              onClick={() => {
                setSelectedCard(null);
              }}
            />
          )}
        </div>
        {displayType === PeoplePageDispaType.cards && (
          <div className="hero-info-wrapper">
            {itemCardIdSelected && <Divider style={{ marginTop: 0 }} />}
            <HeroInfo
              item={item}
              showFullInfo={itemCardIdSelected}
              relationships={relationships}
              getFilmData={getFilmData}
              getPlanetData={getPlanetData}
            />
          </div>
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
  favoriteHeroes: PT.object,
  toggleFavoriteHero: PT.func.isRequired,
  observerIndex: PT.number.isRequired,
  setObservedItemIndex: PT.func.isRequired,
  setSelectedCard: PT.func.isRequired,
  selectedCardId: PT.number,
  getFilmData: PT.func,
  getPlanetData: PT.func,
  relationships: PT.shape(RelationshipsStorePropTypes),
  wrapperRef: PT.oneOfType([PT.element, PT.object]),
};

export const PersonCard = PersonCardItem;
