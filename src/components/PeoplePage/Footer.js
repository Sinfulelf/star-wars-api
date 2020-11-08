import React from "react";
import PropTypes from "prop-types";

import { Pagination } from "semantic-ui-react";

const Footer = ({
  pageName,
  activePage = 1,
  totalPages,
  onPageChange,
  loading,
}) => {
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
        disabled: loading,
      };
  return (
    <div className={`page-footer ${pageName}__footer`}>
      <Pagination {...paginationConfig} firstItem={null} lastItem={null} />
    </div>
  );
};

Footer.propTypes = {
  pageName: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  activePage: PropTypes.string,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
};

export const PeoplePageFooter = Footer;
