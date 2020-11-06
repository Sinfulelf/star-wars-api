import { IdUrlModel } from "../generalModels";
import { StartWarsUrlGetIdRegEx } from "../../data";

export class FilmDetail extends IdUrlModel {
  constructor(url) {
    super(StartWarsUrlGetIdRegEx.GET_FILM_REGEX);
    this.url = url;
  }

  title = "";
  releaseDate = null;
}
