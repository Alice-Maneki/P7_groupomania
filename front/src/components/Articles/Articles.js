/* thread des différents posts = fil d'actualité avec infinite scroll */
import React, {Component} from "react";
import appelApi from '../../services/api';


class ArticlesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }  
  }

  componentDidMount(){
    appelApi.getArticles()
      .then((res) => {
        JSON.parse(localStorage.getItem('login'))
        this.setState({articles : res.data});
        console.log(res.data);
      })
      .catch((error) => console.log(error.message) );
    
  }
  render() {
    return (
      <div>
        <p>
         ceci est le fil d'articles
        </p>
      </div>
    );
  }
}

export default ArticlesComponent;

