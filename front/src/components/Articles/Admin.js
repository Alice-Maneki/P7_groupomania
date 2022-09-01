import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import appelApi from "../../services/api";
import { toastArticleDeleted } from "../../services/toasts.article";

const Admin = ({article}) => {
  const [adminUser, setAdminUser] = useState([]);
  const id = JSON.parse(localStorage.getItem("userId"));

  const userById = () => {
    appelApi
      .getUserById(id)
      .then((res) => {
        setAdminUser([res.data]);
        console.log("userById", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    userById();
  }, []);

  const deleteItem = (deleteId) => {
    appelApi
      .deleteArticle(deleteId)
      .then((res) => {
        console.log(res);
        toastArticleDeleted();
        alert("message supprimé !");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("deleteID", deleteId);
  };

  return (
    <>
      {adminUser.map((user) => (
        user.admin === true && (
        <div className="article-foot-update-delete">
          <FontAwesomeIcon
            className="delete-post-icon"
            icon={faTrashCan}
            onClick={() => deleteItem(article._id)}
          ></FontAwesomeIcon>
        </div>
        )
      ))}
    </>
  );
};

export default Admin;
