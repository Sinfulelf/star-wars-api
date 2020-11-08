import PT from "prop-types";
import { HeroDetails, PeoplePageDispaType } from "../dataModels";

export class PeopleStore {
  timeStamp = 0;
  loading = true;
  people = [];
  totalPeopleCount = 0;
  person = null;

  filterName = "";

  currentPage = "1";
  uploadedPages = [];

  itemsPerPage = 10;

  displayType = PeoplePageDispaType.list;
}

export const PeopleStorePropTypes = {
  timeStamp: PT.number,
  loading: PT.bool,
  people: PT.arrayOf(PT.instanceOf(HeroDetails)),
  totalPeopleCount: PT.number,
  person: PT.oneOfType([PT.instanceOf(null), PT.instanceOf(HeroDetails)]),
  currentPage: PT.string,
  filterName: PT.string,
  uploadedPages: PT.arrayOf(PT.string),

  displayType: PT.oneOf([PeoplePageDispaType.list, PeoplePageDispaType.cards]),
};
