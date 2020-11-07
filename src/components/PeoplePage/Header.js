import React from "react";
import PropTypes from "prop-types";

const Header = ({ pageName }) => {
  return <div className={`page-header ${pageName}__header`}>123</div>;
};

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export const PeoplePageHeader = Header;
