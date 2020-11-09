import React from "react";
import PT from "prop-types";

import { HeroDetailsPropTypes } from "../../../models/dataModels";

import { ParagraphMock } from "../../helpersComponents/Mocks";

import { HeroProperty } from "./HeroProperty";

const HeroInfoPropertiesItem = ({ item }) => (
  <div className="full-space hero-info__properties">
    <HeroProperty
      key="height"
      name="Height"
      value={item.loaded ? item.height : <ParagraphMock width={120} />}
    />
    <HeroProperty
      key="mass"
      name="Mass"
      value={item.loaded ? item.mass : <ParagraphMock width={70} />}
    />
    <HeroProperty
      key="hairColour"
      name="Hair color"
      value={item.loaded ? item.hairColour : <ParagraphMock width={80} />}
    />
    <HeroProperty
      key="skinColour"
      name="Skin color"
      value={item.loaded ? item.skinColour : <ParagraphMock width={80} />}
    />
    <HeroProperty
      key="eyeColour"
      name="Eye Color"
      value={item.loaded ? item.eyeColour : <ParagraphMock width={80} />}
    />
    <HeroProperty
      key="birthYear"
      name="Birth Year"
      value={item.loaded ? item.birthYear : <ParagraphMock width={70} />}
    />
    <HeroProperty
      key="gender"
      name="Gender"
      value={item.loaded ? item.gender : <ParagraphMock width={75} />}
    />
  </div>
);

HeroInfoPropertiesItem.propTypes = {
  item: PT.shape(HeroDetailsPropTypes).isRequired,
  cardView: PT.bool,
};

export const HeroInfoProperties = HeroInfoPropertiesItem;
