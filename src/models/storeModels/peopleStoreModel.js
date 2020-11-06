import PT from "prop-types";
import { HeroDetails } from "../dataModels";

export class PeopleStore {
  timeStamp = 0;
  loading = true;
  people = [];
  totalPeopleCount = 0;
  person = null;
  uploadedPages = [];
}

export const PeopleStorePropTypes = {
  timeStamp: PT.number,
  loading: PT.bool,
  people: PT.arrayOf(PT.instanceOf(HeroDetails)),
  totalPeopleCount: PT.number,
  person: PT.oneOfType([PT.instanceOf(null), PT.instanceOf(HeroDetails)]),
  uploadedPages: PT.arrayOf(PT.number),
};
