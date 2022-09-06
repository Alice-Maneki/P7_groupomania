/* formulaire pour poster un commentaire lié à un article */
import React, { useState, useEffect } from "react";
import appelApi from "../../services/api";
import { dateParser } from "../../services/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Comment = ({ article }) => {
  const [text, setText] = useState("");
  const [users, setUsers] = useState([]);

  const commenterId = JSON.parse(localStorage.getItem("userId"));

  const usersData = () => {
    appelApi
      .getUsers()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    usersData();
  }, []);

  const sendData = (event) => {
    event.preventDefault();
    const comments = { commenterId, text };
    const commentError = document.querySelector(".messageError");

    if (text === "") {
      commentError.innerHTML = "Votre commentaire est vide !!";
    } else {
      appelApi
        .newComment(article._id, comments)
        .then((res) => {
          if (res.ok) {
            console.log(res);
            alert("nouveau commentaire publié");
            
          }
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("newComment", comments);
    }
  };

  const deleteItem = (deleteId) => {
    
    appelApi
      .deleteComment(deleteId)
      .then((res) => {
        console.log(res);
        alert("commentaire supprimé !");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="comment-show">
      <div className="comment-container">
        {article.comments.map((comment) => {
          return (
            <div
              className={
                comment.commenterId === usersData.userId
                  ? "comment-user"
                  : "comment-all-users"
              }
              key={comment._id}
            >
              <div className="commenter-header">
                {users.map((user) => (
                  <>
                    {comment.commenterId === user._id && (
                      <div className="commenter-id">
                        <img
                          className="commenter-id-pict"
                          src={user.picture}
                          alt="profil utilisateur"
                        />
                        <div className="commenter-id-name">
                          {user.name} {user.firstName}
                        </div>
                      </div >
                    )}
                 
                  </>
                 
                ))}
                <span className="comment-date">
                  {dateParser(article.updatedAt)}
                </span>
              </div>
              <div className="comment-text">"{comment.text}"</div>
              {commenterId === comment.commenterId && (
                <div className="comment-update">
                  <div className="comment-update-delete">
                    <FontAwesomeIcon
                      className="delete-icon"
                      icon={faTrashCan}
                      onClick={() => deleteItem(comment.commenterId)}
                    ></FontAwesomeIcon>
                  </div>
                </div>
              )}
              
            </div>
          );
        })}
      </div>

      <form className="comment-container-new">
        <textarea
          id="text"
          name="text"
          type="text"
          placeholder="Laisser un commentaire !"
          value={text}
          required
          onChange={(event) => setText(event.target.value)}
        />
        <button
          onClick={(event) => sendData(event)}
          className="btn-publier-comment"
        >
          Publier
        </button>
        <div className="commentError"></div>
      </form>
    </div>
  );
};

export default Comment;
