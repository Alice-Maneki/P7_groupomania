import React, { useEffect, useState } from "react";
import appelApi from '../../services/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const LikeButton = ({ article }) => {


  const [liked, setliked] = useState(false);
  const id = JSON.parse(localStorage.getItem("userId"));
  console.log("id", id);

  useEffect(() => {
    if (article.likes.includes(id._id)) setliked(true);
  }, [article.likes, id]);

  
  const like = () => {
    return appelApi.likeArticle('id')
        .then((res) => {
            setliked(true)
            
        })
        .catch((error) => console.log(error.message));
  };

  const unlike = () => {
    return appelApi.likeArticle('id')
        .then((res) => {
            setliked(false)
            
        })
        .catch((error) => console.log(error.message));
  };

  return (
    <div className="article-foot-like">
      {liked === false && (
        <>
          <FontAwesomeIcon
            className="article-foot-like-icon"
            icon={faHeart}
            onClick={like}
          ></FontAwesomeIcon>
          
        </>
      )}
      {liked === true && (
        <>
        <FontAwesomeIcon
            className="article-foot-like-icon-red"
            icon={faHeart}
            onClick={unlike}
          ></FontAwesomeIcon>
          
        </>
      )}
      <span>{article.likes.length}</span>
    </div>
  );
};

export default LikeButton;
