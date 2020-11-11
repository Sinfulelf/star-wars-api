import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { RelationshipsStorePropTypes } from "../../models/storeModels";

import {
  HeroDetailsPropTypes,
  PeoplePageDispaType,
} from "../../models/dataModels";

import { personCardConfig } from "./personCardConfig";

import ReactResizeDetector from "react-resize-detector";
import { Dimmer, Loader, Segment, Transition } from "semantic-ui-react";

import { PersonCard } from "./PersonCard";
import { HeroInfo } from "./HeroInfo";

class Content extends PureComponent {
  setRef = (name, ref) => {
    if (!this[name]) {
      this[name] = ref;
    }
  };

  render() {
    const {
      pageName,
      loading,
      data,
      displayType,
      toggleFavoriteHero,
      favoriteHeroes,
      observerIndex,
      setObservedItemIndex,
      relationships,
      getFilmData,
      getPlanetData,
      setSelectedCardItem,
      selectedCardId,
    } = this.props;

    return (
      <div
        className={`page-content ${pageName}__content`}
        style={{
          paddingTop: "1.75em",
          paddingBottom: "1.75em",
          overflow: "hidden",
        }}
      >
        {loading && (
          <Dimmer active inverted className="p-absolute">
            <Loader inverted size="huge">
              Loading
            </Loader>
          </Dimmer>
        )}
        {!loading &&
          displayType === PeoplePageDispaType.cards &&
          !!selectedCardId && (
            <Dimmer
              active
              inverted
              className="p-absolute card-open-mask"
              onClick={() => {
                setSelectedCardItem(null);
              }}
            />
          )}
        {!loading && !data.length && <h2>No data to display.</h2>}
        <ReactResizeDetector handleWidth>
          {({ width }) => (
            <div
              className={`heroes-cards__wrapper ${
                !!selectedCardId ? "overflow-hidden" : ""
              }`}
              ref={(ref) => this.setRef("cardsWrapper", ref)}
            >
              {data.map((item, index) => (
                <PersonCard
                  key={item.urlValue || index}
                  wrapperWidth={width}
                  index={index}
                  displayType={displayType}
                  item={item}
                  favoriteHeroes={favoriteHeroes}
                  toggleFavoriteHero={toggleFavoriteHero}
                  observerIndex={observerIndex}
                  setObservedItemIndex={setObservedItemIndex}
                  setSelectedCard={setSelectedCardItem}
                  selectedCardId={selectedCardId}
                  relationships={relationships}
                  getFilmData={getFilmData}
                  getPlanetData={getPlanetData}
                  wrapperRef={this.cardsWrapper || null}
                />
              ))}
              {!!data[observerIndex] && (
                <Transition
                  visible={displayType === PeoplePageDispaType.list}
                  animation="scale"
                  duration={400}
                >
                  <div
                    className="full-space"
                    style={{
                      paddingLeft:
                        personCardConfig.stylesConfigs[PeoplePageDispaType.list]
                          .width +
                        personCardConfig.stylesConfigs[PeoplePageDispaType.list]
                          .userInfoMargin,
                    }}
                  >
                    <Segment className="user-info">
                      <HeroInfo
                        item={data[observerIndex]}
                        relationships={relationships}
                        getFilmData={getFilmData}
                        getPlanetData={getPlanetData}
                        showFullInfo={displayType === PeoplePageDispaType.list}
                      />
                    </Segment>
                  </div>
                </Transition>
              )}
            </div>
          )}
        </ReactResizeDetector>
      </div>
    );
  }
}

Content.propTypes = {
  pageName: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  displayType: PropTypes.oneOf([
    PeoplePageDispaType.cards,
    PeoplePageDispaType.list,
  ]).isRequired,
  observerIndex: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape(HeroDetailsPropTypes)).isRequired,
  favoriteHeroes: PropTypes.object,
  toggleFavoriteHero: PropTypes.func.isRequired,
  setObservedItemIndex: PropTypes.func.isRequired,
  relationships: PropTypes.shape(RelationshipsStorePropTypes).isRequired,
  getFilmData: PropTypes.func.isRequired,
  getPlanetData: PropTypes.func.isRequired,
  setSelectedCardItem: PropTypes.func.isRequired,
  selectedCardId: PropTypes.number,
};

export const PeoplePageContent = Content;
