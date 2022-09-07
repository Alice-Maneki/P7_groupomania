/* fil d'actualité des différents posts */

import React, { useEffect, useReducer, useState } from 'react';
import appelApi from '../../services/api';
import Article from "./Article";
import NewArticle from "./NewArticle";

const Articles = () => {

  const [articles, setArticles] = useState([]);


  useEffect(() => {
    
    articlesData();
    
  }, []);

  
  const articlesData = () => {
    
    appelApi.getArticles()
      .then((res) => {
        setArticles(res.data);
    
        
      })
      .catch((error) => {console.log(error)});
  };

  return (
    <>
    <div className="articles_container" >
        <div className="new-article">
              <NewArticle />
          </div>
          
          <div className="article_block">
            
              {articles.map((article) => (                
                  <Article article={article} key={article} />
                )) 
                }
                
          </div>
        </div>
      </>
    
  );
};

export default Articles;
