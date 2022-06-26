/* données de chaque utilisateurs */

import { GET_USER } from "../actions/user.actions";

/* état initial qui va évoluer en fn du store */
const initialState = {};

/* on incrémente l'initialState avec la data */
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    default:
      return state;
  }
}
