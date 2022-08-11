import React, { useEffect, useState } from "react";
import { dateParser } from "../../services/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilSquare } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import Comment from "./Comment";
import LikeButton from "./LikeButton";
import appelApi from "../../services/api";

const Article = ({ article }) => {
  const [showComment, setShowComment] = useState(false);

  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);

  const id = JSON.parse(localStorage.getItem("userId"));
  console.log("userId", id);
    console.log("articleId", article.userId);

  const updateItem = async (res) => {
     
        return appelApi.modifyArticle()
            .then()
            .catch();
    };

  return (
    <>
      <div className="article-container">
        <li key={article._id}>
          <div className="article-header">
            <div className="article-user-profil">
              <img
                className="article-user-pict"
                src={""}
                alt="photo de profil utilisateur"
              />
              <div className="article-user-name">{article.userID}</div>
            </div>

            <span className="article-date">
              {dateParser(article.createdAt)}
            </span>
          </div>

            {isUpdated === false && 
          <p className="article-message">{article.message}</p>
            }
            {isUpdated && (
                <div className="update-post">
                    <textarea 
                        defaultValue={article.message}
                        onChange={(event) => setTextUpdate(event.target.value)}
                    />
                    <button className="update-post-btn" onClick={updateItem}>
                        Valider
                    </button>
                </div>
            )}

          <div className="article-foot">
            <div>
              <LikeButton article={article} />
            </div>

            <div className="article-foot-comment">
              <FontAwesomeIcon
                className="article-foot-comment-icon"
                icon={faComment}
                onClick={() => setShowComment(!showComment)}
              ></FontAwesomeIcon>
              <span>{article.comments.length}</span>
            </div>

            {id === article.userId && (
                
                <FontAwesomeIcon
                className="update-post-icon"
                icon={ faPencilSquare }
                onClick={() => setIsUpdated(!isUpdated)}
                ></FontAwesomeIcon>
            )}
          </div>

          <div className="article-foot-modify">
            
          </div>

          <div className="article-foot-delete">

          </div>
        </li>
        {showComment && <Comment article={article} />}
      </div>
    </>
  );
};

export default Article;
