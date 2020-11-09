import PT from "prop-types";

export class RelationshipsStore {
  timeStamp = 0;

  filmsData = {};
  planestsData = {};
}

export const RelationshipsStorePropTypes = {
  timeStamp: PT.number,
  filmsData: PT.object,
  planestsData: PT.object,
};
