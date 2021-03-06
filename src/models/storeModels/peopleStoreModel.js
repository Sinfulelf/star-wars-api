import PT from "prop-types";
import { HeroDetails, PeoplePageDispaType } from "../dataModels";

export class PeopleStore {
  timeStamp = 0;
  loading = true;
  people = [];
  totalPeopleCount = 0;

  observerIndex = 0;

  filterName = "";

  currentPage = "1";
  uploadedPages = [];

  favoriteHeroes = null;

  itemsPerPage = 10;
  exFavorite = false;

  selectedCardId = null;

  displayType = PeoplePageDispaType.list;
  showFavoritesOnly = false;
}

export const PeopleStorePropTypes = {
  timeStamp: PT.number,
  loading: PT.bool,
  people: PT.arrayOf(PT.instanceOf(HeroDetails)),
  totalPeopleCount: PT.number,
  observerIndex: PT.number,
  currentPage: PT.string,
  filterName: PT.string,
  uploadedPages: PT.arrayOf(PT.string),

  favoriteHeroes: PT.object,

  exFavorite: PT.bool,

  displayType: PT.oneOf([PeoplePageDispaType.list, PeoplePageDispaType.cards]),
  showFavoritesOnly: PT.bool,

  selectedCardId: PT.number,
};
