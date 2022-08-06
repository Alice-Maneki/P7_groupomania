/* thread des différents posts = fil d'actualité avec infinite scroll */
import React, {Component} from "react";
import appelApi from '../../services/api';
import Article from "./Article";


class Articles extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }  
  }

  componentDidMount(){
    appelApi.getArticles()
      .then((res) => {
      
        this.setState({articles : res.data});
        console.log(res.data);
      })
      .catch((error) => console.log(error.message) );
    
  }

  
  render() {
    return (
      <>
        <div className="articles_container">
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

