import React, { useEffect, useState } from "react";
import { dateParser } from "../../services/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilSquare } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Comment from "./Comment";
import Admin from "./Admin";
import LikeButton from "./LikeButton";
import appelApi from "../../services/api";
import { useNavigate } from "react-router-dom";

const Article = ({ article }) => {
  const [showComment, setShowComment] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const id = JSON.parse(localStorage.getItem("userId"));
  //console.log("-----Id", id);
  //console.log("-----articleId", article.userId);

  const usersData = () => {
    appelApi
      .getUsers()
      .then((res) => {
        setUsers(res.data);
        //console.log("usersData", res.data);
      })
      .catch((error) => {
        console.log(error);
      });

  };


  useEffect(() => {
    usersData();
    
  }, []);
 
  // réinitialiser les données
  const initData = () => {
    
    appelApi.getArticles()
      .then((res) => {
        setArticles(res.data);       
      })
      .catch((error) => {console.log(error)});
  };

  useEffect(() => {
    
    initData();
    
  }, []);

  const updateItem = () => {
    const newArticle = { message };
    appelApi
      .modifyArticle(article._id, newArticle)
      .then((res) => {
        console.log(res);
        alert("votre message a été modifié !");
        isUpdated(false);
        initData();
        navigate("/trending");
      })
      .catch((error) => {
        console.log(error);
      });
    //console.log("updateArticle", newArticle);
  };

  const deleteItem = (deleteId) => {
    appelApi
      .deleteArticle(deleteId)
      .then((res) => {
        console.log(res);
        alert("message supprimé !"); 
        initData();
        navigate("/trending");
      })
      .catch((error) => {
        console.log(error);
      });
    //console.log("deleteID", deleteId);
  };

  return (
    <>
      <div className="article-container" article={article}>
        <div className="article-header">
          {users.map((user) => (
            <>
              {article.userId === user._id && (
                <div className="article-user-profil">
                  <img
                    className="article-user-profil-pict"
                    src={user.picture}
                    alt="profil utilisateur"
                  />

                  <div className="article-user-profil-name">
                    {user.name}
                    {user.firstName}
                  </div>
                </div>
              )}
               
            </>
          ))}

          <span className="article-date">{dateParser(article.createdAt)}</span>
        </div>

        {isUpdated === false && (
          <p className="article-message">{article.message}</p>
        )}
        {isUpdated && (
          <div className="update-post">
            <textarea
              defaultValue={article.message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button
              className="update-post-btn"
              onClick={() => updateItem(article._id)}
            >
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
            <div className="article-foot-update">
              <div className="article-foot-update-modify">
                <FontAwesomeIcon
                  className="update-post-icon"
                  icon={faPencilSquare}
                  onClick={() => setIsUpdated(!isUpdated)}
                ></FontAwesomeIcon>
              </div>

              <div className="article-foot-update-delete">
                <FontAwesomeIcon
                  className="delete-post-icon"
                  icon={faTrashCan}
                  onClick={() => deleteItem(article._id)}
                ></FontAwesomeIcon>
              </div>
            </div>
          )}

       
          <Admin article={article} />
          
          
              
        </div>

        {showComment && <Comment article={article} />}
      </div>
    </>
  );
};

export default Article;
