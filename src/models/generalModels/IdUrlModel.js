import PT from "prop-types";

export class IdUrlModel {
  constructor(pettern) {
    this.#pattern = pettern;
  }
  #pattern = "";

  get url() {
    return this.urlValue;
  }
  set url(val) {
    if (!this.id && val) {
      const matchVal = this.#pattern.exec(val);
      if (matchVal && matchVal.length >= 2) {
        this.id = Number(matchVal[1].replace("/", ""));
      }
    }
    this.urlValue = val;
  }
}

export const IdUrlModelPropTypes = {
  id: PT.oneOfType([PT.string, PT.number]).isRequired,
  url: PT.string,
};
