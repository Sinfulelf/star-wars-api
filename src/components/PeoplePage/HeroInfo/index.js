import React, { PureComponent } from "react";
import PT from "prop-types";

import { RelationshipsStorePropTypes } from "../../../models/storeModels";
import { HeroDetailsPropTypes } from "../../../models/dataModels";

import { Divider } from "semantic-ui-react";

import { HeroInfoProperties } from "./HeroInfoProperties";
import { HeroHomeProperty } from "./HeroHomeProperty";
import { HeroFilmsProperty } from "./HeroFilmsProperty";

class HeroInfoItem extends PureComponent {
  async componentDidMount() {
    await this.uploadHeroAdditionalData();
  }

  async componentDidUpdate(prevProps) {
    const { item, showFullInfo } = this.props;
    if (
      item.id !== prevProps.item.id ||
      showFullInfo !== prevProps.showFullInfo
    ) {
      await this.uploadHeroAdditionalData();
    }
  }

  uploadHeroAdditionalData = async () => {
    const {
      item,
      getFilmData,
      getPlanetData,
      relationships,
      showFullInfo,
    } = this.props;
    if (showFullInfo) {
      if (!(item.planet.id in relationships.planestsData)) {
        await getPlanetData(item.planet.id);
      }

      for (let film of item.films) {
        if (film && !(film.id in relationships.filmsData)) {
          await getFilmData(film.id);
        }
      }
    }
  };

  render() {
    const { item, relationships, showFullInfo = false } = this.props;

    return (
      <div className="hero-info">
        {!showFullInfo && <Divider style={{ marginTop: 0 }} />}
        <HeroInfoProperties item={item} />
        {!showFullInfo ? (
          <div className="bottom-mask"></div>
        ) : (
          <>
            <Divider />
            <HeroHomeProperty
              item={item}
              planets={relationships.planestsData}
            />
            <Divider />
            <HeroFilmsProperty item={item} films={relationships.filmsData} />
          </>
        )}
      </div>
    );
  }
}

HeroInfoItem.propTypes = {
  item: PT.shape(HeroDetailsPropTypes).isRequired,
  relationships: PT.shape(RelationshipsStorePropTypes),
  getFilmData: PT.func,
  getPlanetData: PT.func,
  showFullInfo: PT.bool,
};

export const HeroInfo = HeroInfoItem;
