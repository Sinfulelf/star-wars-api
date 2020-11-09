import PT from "prop-types";

import { IdUrlModel, IdUrlModelPropTypes } from "../generalModels";
import { StartWarsUrlGetIdRegEx } from "../../data";

export class PlanetDetails extends IdUrlModel {
  constructor(url) {
    super(StartWarsUrlGetIdRegEx.GET_PLANET_REGEX);
    this.url = url;
  }

  name = "";
  population = 0;
  climate = "";
}

export const PlanetDetailsPropTypes ={
  ...IdUrlModelPropTypes,
  name: PT.string,
  population: PT.number,
  climate: PT.string,
};
