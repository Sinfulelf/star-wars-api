import { IdUrlModel } from "../generalModels";
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
