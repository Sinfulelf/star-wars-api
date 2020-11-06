import React from "react";
import PropTypes from "prop-types";

export const ParagraphMock = ({ width, height = 14 }) => (
  <div
    className="paragraph-mock"
    style={{
      width,
      height,
    }}
  ></div>
);

ParagraphMock.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
