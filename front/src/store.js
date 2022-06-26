
/* créer un store redux : regroupe les reducers */
import { configureStore } from '@reduxjs/toolkit';
import articleReducer from './reducers/article.reducer';
import userReducer from './reducers/user.reducer';

export default configureStore({
  reducer: {
    user : userReducer,
    article : articleReducer,
  },
})