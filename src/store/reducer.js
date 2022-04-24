import { ACTIONS } from "./actions";
// state managment using react usereducer
export function reducer(favorites, action) {
  switch (action.type) {
    case ACTIONS.ADD_FAVORITE:
      return [...favorites, action.payload];
    case ACTIONS.REMOVE_FAVORITE:
      return favorites.filter((fav) => fav.Key !== action.payload.Key);
    default:
      return favorites;
  }
}
