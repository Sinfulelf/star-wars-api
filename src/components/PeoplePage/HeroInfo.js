import React from "react";
import PT from "prop-types";

import { HeroDetailsPropTypes } from "../../models/dataModels";

import { Divider } from "semantic-ui-react";

const HeroProperty = ({ name, value }) => (
  <div className="property">
    <h5 className="property-name">{name}:</h5>
    <div className="property-content">
      <div style={{ paddingRight: ".3em" }}>●</div>
      <div>{value}</div>
    </div>
  </div>
);

const HeroInfoItem = ({ item, cardView = false }) => (
  <div className="hero-info">
    {cardView && <Divider style={{ marginTop: 0 }} />}
    <div className="full-space hero-info__properties">
      <HeroProperty key="height" name="Height" value={item.height} />
      <HeroProperty key="mass" name="Mass" value={item.mass} />
      <HeroProperty
        key="hairColour"
        name="Hair color"
        value={item.hairColour}
      />
      <HeroProperty
        key="skinColour"
        name="Skin color"
        value={item.skinColour}
      />
      <HeroProperty key="eyeColour" name="Eye Color" value={item.eyeColour} />
      <HeroProperty key="birthYear" name="Birth Year" value={item.birthYear} />
      <HeroProperty key="gender" name="Gender" value={item.gender} />
    </div>
    <Divider />
    {cardView && <div className="bottom-mask"></div>}
  </div>
);

HeroInfoItem.propTypes = {
  item: PT.shape(HeroDetailsPropTypes).isRequired,
  cardView: PT.bool,
};

export const HeroInfo = HeroInfoItem;
