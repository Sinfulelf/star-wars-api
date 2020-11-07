import React from "react";
import PropTypes from "prop-types";

import { Pagination } from "semantic-ui-react";

const Footer = ({ pageName, activePage = 1, totalPages, onPageChange }) => {
  const paginationConfig = !totalPages
    ? {
        totalPages: 10,
        disabled: true,
      }
    : {
        activePage,
        totalPages,
        ellipsisItem: { className: "disabled", content: "..." },
        async onPageChange(_, { activePage }) {
          await onPageChange(activePage);
        },
      };
  return (
    <div className={`page-footer ${pageName}__footer`}>
      <Pagination {...paginationConfig} />
    </div>
  );
};

Footer.propTypes = {
  pageName: PropTypes.string.isRequired,
  activePage: PropTypes.string,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
};

export const PeoplePageFooter = Footer;
