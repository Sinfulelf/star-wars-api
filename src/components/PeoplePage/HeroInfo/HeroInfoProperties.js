import React from "react";
import PT from "prop-types";

import { HeroDetailsPropTypes } from "../../../models/dataModels";

import { HeroProperty } from "./HeroProperty";

const HeroInfoPropertiesItem = ({ item }) => (
  <div className="full-space hero-info__properties">
    <HeroProperty key="height" name="Height" value={item.height} />
    <HeroProperty key="mass" name="Mass" value={item.mass} />
    <HeroProperty key="hairColour" name="Hair color" value={item.hairColour} />
    <HeroProperty key="skinColour" name="Skin color" value={item.skinColour} />
    <HeroProperty key="eyeColour" name="Eye Color" value={item.eyeColour} />
    <HeroProperty key="birthYear" name="Birth Year" value={item.birthYear} />
    <HeroProperty key="gender" name="Gender" value={item.gender} />
  </div>
);

HeroInfoPropertiesItem.propTypes = {
  item: PT.shape(HeroDetailsPropTypes).isRequired,
  cardView: PT.bool,
};

export const HeroInfoProperties = HeroInfoPropertiesItem;
