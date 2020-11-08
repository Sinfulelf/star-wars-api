import React from "react";
import PropTypes from "prop-types";

import { PeoplePageDispaType } from "../../models/dataModels";

import { Form, Checkbox } from "semantic-ui-react";

import { HeaderFilterInput } from "./HeaderFilterInput";
import { HeaderPagination } from "./HeaderPagination";

const Header = ({
  pageName,
  isFavorites,
  showFavoriteOnly,
  displayType,
  setPeoplePagedisplayType,
  search
}) => {
  return (
    <div className={`page-header ${pageName}__header`}>
      <Form className="header-toggle">
        <Form.Field>
          <Checkbox
            slider
            label="Show cards"
            checked={displayType === PeoplePageDispaType.cards}
            onChange={() => {
              setPeoplePagedisplayType(
                displayType === PeoplePageDispaType.cards
                  ? PeoplePageDispaType.list
                  : PeoplePageDispaType.cards
              );
            }}
          />
        </Form.Field>
      </Form>
      <HeaderFilterInput search={search} />
      <HeaderPagination
        isFavorites={isFavorites}
        showFavoriteOnly={showFavoriteOnly}
      />
    </div>
  );
};

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  isFavorites: PropTypes.bool.isRequired,
  showFavoriteOnly: PropTypes.func.isRequired,
  displayType: PropTypes.string.isRequired,
  setPeoplePagedisplayType: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired
};

export const PeoplePageHeader = Header;
