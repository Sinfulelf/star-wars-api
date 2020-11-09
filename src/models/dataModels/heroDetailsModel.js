import PT from "prop-types";

import {
  PlanetDetails,
  FilmDetail,
  FilmDetailPropTypes,
  PlanetDetailsPropTypes,
} from "./";
import { IdUrlModel, IdUrlModelPropTypes } from "../generalModels";
import { StartWarsUrlGetIdRegEx } from "../../data";

export class HeroDetails extends IdUrlModel {
  constructor() {
    super(StartWarsUrlGetIdRegEx.GET_PEOPLE_REGEX);
  }
  name = "";
  height = "";
  mass = 0;
  hairColour = "";
  skinColour = "";
  eyeColour = "";
  birthYear = "";
  gender = "";
  planet = null;
  films = [];

  fromPage = "";

  static new(resultItem) {
    const entity = new HeroDetails();

    if ("birth_year" in resultItem) entity.birthYear = resultItem.birth_year;
    if ("eye_color" in resultItem) entity.eyeColour = resultItem.eye_color;
    if ("films" in resultItem)
      entity.films = (resultItem.films || []).map((x) => new FilmDetail(x));
    if ("gender" in resultItem) entity.gender = resultItem.gender;
    if ("hair_color" in resultItem) entity.hairColour = resultItem.hair_color;
    if ("height" in resultItem) entity.height = resultItem.height;
    if ("homeworld" in resultItem)
      entity.planet = new PlanetDetails(resultItem.homeworld);
    if ("mass" in resultItem) entity.mass = resultItem.mass;
    if ("name" in resultItem) entity.name = resultItem.name;
    if ("skin_color" in resultItem) entity.skinColour = resultItem.skin_color;
    if ("url" in resultItem) entity.url = resultItem.url;

    return entity;
  }
}

export const HeroDetailsPropTypes = {
  ...IdUrlModelPropTypes,
  name: PT.string.isRequired,
  height: PT.oneOfType([PT.number, PT.string]).isRequired,
  mass: PT.oneOfType([PT.number, PT.string]).isRequired,
  hairColour: PT.string.isRequired,
  skinColour: PT.string.isRequired,
  eyeColour: PT.string.isRequired,
  birthYear: PT.string.isRequired,
  gender: PT.string.isRequired,
  planet: PT.shape(PlanetDetailsPropTypes),
  films: PT.arrayOf(PT.shape(FilmDetailPropTypes)).isRequired,
  fromPage: PT.oneOfType([PT.string, PT.number]).isRequired,
};
