import React from "react";
import PropTypes from "prop-types";

const Content = ({ pageName }) => {
  return <div className={`page-content ${pageName}__content`}>789</div>;
};

Content.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export const PeoplePageContent = Content;
