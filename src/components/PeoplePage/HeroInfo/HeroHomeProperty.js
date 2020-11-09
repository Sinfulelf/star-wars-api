import React from "react";
import PT from "prop-types";

import { ParagraphMock } from "../../helpersComponents/Mocks";

import { HeroDetailsPropTypes } from "../../../models/dataModels";
import { HeroProperty } from "./HeroProperty";

const HeroHomePropertyItem = ({ item, planets }) => {
  const planet = planets[item.planet.id];
  return (
    <div className="full-space hero-info__home">
      <h3 className="title">Home world</h3>
      <HeroProperty
        key="name"
        name="Name"
        value={
          !!planet ? planet.name : <ParagraphMock width={110} height={22} />
        }
      />
      <HeroProperty
        key="population"
        name="Population"
        value={
          !!planet ? (
            planet.population
          ) : (
            <ParagraphMock width={120} height={22} />
          )
        }
      />
      <HeroProperty
        key="climate"
        name="Climate"
        value={
          !!planet ? planet.climate : <ParagraphMock width={180} height={22} />
        }
      />
    </div>
  );
};

HeroHomePropertyItem.propTypes = {
  item: PT.shape(HeroDetailsPropTypes).isRequired,
  planets: PT.object.isRequired,
};

export const HeroHomeProperty = HeroHomePropertyItem;
