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

class Content extends PureComponent {
  state = {
    prevDisplayType: "",
    currentDisplayType: "",
  };

  static getDerivedStateFromProps(props, state) {
    if (props.displayType !== state.currentDisplayType) {
      return {
        prevDisplayType: state.currentDisplayType,
        currentDisplayType: props.displayType,
      };
    }
    return null;
  }

  render() {
    const { pageName, loading, isFavorites, data, displayType } = this.props;
    //const { prevDisplayType, currentDisplayType } = this.state;

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
                />
              ))}
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
                />
              </Transition>
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
  data: PropTypes.arrayOf(PropTypes.shape(HeroDetailsPropTypes)).isRequired,
};

export const PeoplePageContent = Content;
