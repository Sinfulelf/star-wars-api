import React from "react";
import PT from "prop-types";

const HeroPropertyItem = ({ name, value = "" }) => (
  <div className="property">
    {!!name && <h5 className="property-name">{name}:</h5>}
    <div className="property-content">
      <div style={{ paddingRight: ".3em" }}>●</div>
      <div className="ellipsis">{value}</div>
    </div>
  </div>
);

HeroPropertyItem.propTypes = {
  name: PT.string,
  value: PT.oneOfType([PT.string, PT.number, PT.element]),
};

export const HeroProperty = HeroPropertyItem;
