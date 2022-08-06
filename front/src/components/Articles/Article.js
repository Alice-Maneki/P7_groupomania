
import React, { useState } from 'react';
import api from '../../services/api';
import { dateParser } from '../../services/utils';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import Comment from './Comment';

const Article = ({article}) => {

   const getUsers = [api.getUsers];
   console.log("getUsers", getUsers);
   const getUsersId = [api.getUsersId];
   console.log("getUsersId", getUsersId);

   const [showComment, setShowComment] = useState(false);

    return (
        <>
            <div className='article-container'>
                <li key={article._id}>
                    <div className='article-header'>
                        <div className="article-user-profil">
                           <img className="article-user-pict" src={''} alt="photo de profil utilisateur" />
                            <div className='article-user-name'>{article.userID}</div>
                        </div>
                    
                        <span className='article-date'>
                            {dateParser(article.createdAt)}
                        </span>
                    </div>
                    
                    <p className='article-message'>
                        {article.message}
                    </p>

                    <div className='article-foot'>
                        <div className='article-foot-like'>
                            <FontAwesomeIcon 
                                className="article-foot-like-icon" 
                                icon={faHeart}
                            ></FontAwesomeIcon>
                            <span>{article.likes}</span>
                        </div>
                        <div className='article-foot-comment'>
                            
                                <FontAwesomeIcon 
                                    className="article-foot-comment-icon" 
                                    icon={faComment}
                                    onClick= {() => setShowComment(!showComment)}
                                ></FontAwesomeIcon> 
                                <span>{article.comments.length}</span>
                        </div>
                            
                        
                    </div>
                </li>
                { showComment && <Comment article={article} />}
            </div> 
        </>
    );
};

export default Article;
