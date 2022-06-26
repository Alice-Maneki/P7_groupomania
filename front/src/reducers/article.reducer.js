/* pour afficher les articles sur le fil d'actualité */

import { GET_ARTICLES } from "../actions/article.actions";

/* état initial: vide au début */
const initialState = {};

/* on va chercher la data et on l'incrémente */
export default function articleReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLES:
      return action.payload;

    default:
      return state;
  }
}
