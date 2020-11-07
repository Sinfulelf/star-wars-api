import React from "react";
import PropTypes from "prop-types";

import { PeoplePageDispaType } from "../../models/dataModels";

import { Form, Checkbox } from "semantic-ui-react";

import { HeaderPagination } from "./HeaderPagination";

const Header = ({
  pageName,
  isFavorites,
  showFavoriteOnly,
  dispayType,
  setPeoplePageDispayType,
}) => {
  return (
    <div className={`page-header ${pageName}__header`}>
      <HeaderPagination
        isFavorites={isFavorites}
        showFavoriteOnly={showFavoriteOnly}
      />
      <Form>
        <Form.Field>
          <Checkbox
            slider
            label="Show cards"
            checked={dispayType === PeoplePageDispaType.cards}
            onChange={() => {
              setPeoplePageDispayType(
                dispayType === PeoplePageDispaType.cards
                  ? PeoplePageDispaType.list
                  : PeoplePageDispaType.cards
              );
            }}
          />
        </Form.Field>
      </Form>
    </div>
  );
};

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  isFavorites: PropTypes.bool.isRequired,
  showFavoriteOnly: PropTypes.func.isRequired,
  dispayType: PropTypes.string.isRequired,
  setPeoplePageDispayType: PropTypes.func.isRequired,
};

export const PeoplePageHeader = Header;
