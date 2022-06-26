/* thread des différents posts = fil d'actualité avec infinite scroll */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "../actions/article.actions";

/* il faut maper chaque card avec un style défini */
/* on va charger tous les articles = une seule fois */
const Thread = () => {
  
  const [loadArticle, setLoadArticle] = useState(true);
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articleReducer);

  useDispatch(() => {
    if (loadArticle) {
      dispatch(getArticles());
      setLoadArticle(false);
    }
  }, [loadArticle, dispatch]);

  return (
   <div className="thread-container">
    <ul>
        {!articles.isEmpty(articles[0]) &&
            articles.map((article) => {
            return <li>{article._id}</li>
            })
        }
    </ul>
   </div>
  );
};

export default Thread;
