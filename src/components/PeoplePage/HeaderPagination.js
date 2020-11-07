import React from "react";
import PT from "prop-types";
import { Menu, Icon } from "semantic-ui-react";

const HeaderPaginationItem = ({ isFavorites, showFavoriteOnly }) => (
  <Menu pointing secondary size="large">
    <Menu.Item
      name="people"
      key="people"
      className="people-menu"
      active={!isFavorites}
      onClick={() => {
        showFavoriteOnly(false);
      }}
      style={{ margin: "0 .5em -2px" }}
    >
      <Icon name="users" />
      &#8201; People
    </Menu.Item>
    <Menu.Item
      name="favorites"
      key="favorites"
      className="favorites-menu"
      active={isFavorites}
      onClick={() => {
        showFavoriteOnly(true);
      }}
      style={{ margin: "0 .5em -2px" }}
    >
      <Icon name="heart outline" />
      &#8201; Favorite
    </Menu.Item>
  </Menu>
);

HeaderPaginationItem.propTypes = {
  isFavorites: PT.bool.isRequired,
  showFavoriteOnly: PT.func.isRequired,
};

export const HeaderPagination = HeaderPaginationItem;
