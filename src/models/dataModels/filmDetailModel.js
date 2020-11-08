import PT from "prop-types";

import { IdUrlModel, IdUrlModelPropTypes } from "../generalModels";
import { StartWarsUrlGetIdRegEx } from "../../data";

export class FilmDetail extends IdUrlModel {
  constructor(url) {
    super(StartWarsUrlGetIdRegEx.GET_FILM_REGEX);
    this.url = url;
  }

  title = "";
  releaseDate = null;
}

export const FilmDetailPropTypes = {
  ...IdUrlModelPropTypes,
  title: PT.string.isRequired,
  releaseDate: PT.oneOfType([PT.string, PT.instanceOf(Date)]),
};
