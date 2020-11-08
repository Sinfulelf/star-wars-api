import React, { PureComponent } from "react";
import PropTypes from "prop-types";

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
  render() {
    const {
      pageName,
      loading,
      isFavorites,
      data,
      displayType,
      toggleFavoriteHero,
      favoriteHeroes,
      observerIndex,
      setObservedItemIndex,
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
        {!loading && !data.length && <h2>No data to display.</h2>}
        <ReactResizeDetector handleWidth>
          {({ width }) => (
            <div className="heroes-cards__wrapper">
              {data.map((item, index) => (
                <PersonCard
                  key={item.urlValue}
                  wrapperWidth={width}
                  index={index}
                  displayType={displayType}
                  item={item}
                  favoriteHeroes={favoriteHeroes}
                  toggleFavoriteHero={toggleFavoriteHero}
                  observerIndex={observerIndex}
                  setObservedItemIndex={setObservedItemIndex}
                />
              ))}
              {!!data[observerIndex] && (
                <Transition
                  visible={displayType === PeoplePageDispaType.list}
                  animation="scale"
                  duration={400}
                >
                  <Segment
                    className="user-info"
                    style={{
                      marginLeft:
                        personCardConfig.stylesConfigs[PeoplePageDispaType.list]
                          .width +
                        personCardConfig.stylesConfigs[PeoplePageDispaType.list]
                          .userInfoMargin,
                    }}
                  >
                    <HeroInfo item={data[observerIndex]} />
                  </Segment>
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
  isFavorites: PropTypes.bool.isRequired,
  displayType: PropTypes.oneOf([
    PeoplePageDispaType.cards,
    PeoplePageDispaType.list,
  ]).isRequired,
  observerIndex: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape(HeroDetailsPropTypes)).isRequired,
  favoriteHeroes: PropTypes.arrayOf(PropTypes.number).isRequired,
  toggleFavoriteHero: PropTypes.func.isRequired,
  setObservedItemIndex: PropTypes.func.isRequired,
};

export const PeoplePageContent = Content;
