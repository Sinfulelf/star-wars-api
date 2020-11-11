import React from "react";
import PT from "prop-types";

import { ParagraphMock } from "../../helpersComponents/Mocks";

import { HeroDetailsPropTypes } from "../../../models/dataModels";
import { HeroProperty } from "./HeroProperty";

const HeroFilmsPropertyItem = ({ item, films }) => {
  return (
    <div className="full-space hero-info__films">
      <h3 className="title">Films</h3>
      {item.films.map((x) => (
        <HeroProperty
          key={x.url}
          value={
            films[x.id] ? (
              `${films[x.id].title} by ${films[x.id].releaseDate}`
            ) : (
              <ParagraphMock width={240}  />
            )
          }
        />
      ))}
    </div>
  );
};

HeroFilmsPropertyItem.propTypes = {
  item: PT.shape(HeroDetailsPropTypes).isRequired,
  films: PT.object.isRequired,
};

export const HeroFilmsProperty = HeroFilmsPropertyItem;
