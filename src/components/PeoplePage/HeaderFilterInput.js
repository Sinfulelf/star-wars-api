import React, { useState } from "react";
import PT from "prop-types";
import { Input, Button, Icon } from "semantic-ui-react";

const HeaderFilterInputItem = ({ search }) => {
  const [filterValue, setFilterValue] = useState("");
  const onChange = ({ target }) => {
    setFilterValue(target.value);
  };
  const onButtonClick = () => {
    search(filterValue);
  };
  return (
    <Input
      className="header-input"
      label={
        <Button primary onClick={onButtonClick}>
          Search
        </Button>
      }
      onChange={onChange}
      value={filterValue}
      labelPosition="right"
      placeholder="Filter by name"
    />
  );
};

HeaderFilterInputItem.propTypes = {
  search: PT.func.isRequired,
};

export const HeaderFilterInput = HeaderFilterInputItem;
