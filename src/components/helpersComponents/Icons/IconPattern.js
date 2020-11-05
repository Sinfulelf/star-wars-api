import React from "react";

export default ({ children, fill, stroke, height, width, style, ...props }) => (
  <svg
    x="0px"
    y="0px"
    fill={fill}
    stroke={stroke}
    width={width}
    height={height}
    style={style}
    {...props}
  >
    {children}
  </svg>
);
