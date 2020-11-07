import PT from "prop-types";
import { HeroDetails } from "../dataModels";

export class PeopleStore {
  timeStamp = 0;
  loading = true;
  people = [];
  totalPeopleCount = 0;
  person = null;
  currentPage = "1";

  itemsPerRequest = 10;
}

export const PeopleStorePropTypes = {
  timeStamp: PT.number,
  loading: PT.bool,
  people: PT.arrayOf(PT.instanceOf(HeroDetails)),
  totalPeopleCount: PT.number,
  person: PT.oneOfType([PT.instanceOf(null), PT.instanceOf(HeroDetails)]),
  currentPage: PT.number,
};
