/* fil d'actualité des différents posts */
import React, {Component} from "react";
import appelApi from '../../services/api';
import Article from "./Article";
import NewArticle from "./NewArticle";

class Articles extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      userById: []
    }  
  }
  
  componentDidMount(){
    const id = JSON.parse(localStorage.getItem("userId"));

    appelApi.getArticles()
      .then((res) => {
      
        this.setState({articles : res.data});
        console.log("articlesData", res.data);
      })
      .catch((error) => console.log(error.message) );
    
      appelApi.getUsersId(id)
      .then((res) => {
        this.setState({userById : res.data});
        console.log("userData", res.data);
      })
      .catch((error) => console.log(error.message));
  }

  
  render() {
    return (
      <>
        <div className="articles_container">
          <div className="new-article">
              <NewArticle />
          </div>
          
          <ul className="article_block">
            
              {this.state.articles.map(article => (                
                  <Article article={article} key={article._id} />
                )) 
                }
                
          </ul>
        </div>
      </>
    );
  }
}

export default Articles;

