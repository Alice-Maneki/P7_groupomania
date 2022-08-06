/* header présent sur la page Trending */
import React from "react";
import logo from "../assets/icons/icon-left-font.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSignOut } from "@fortawesome/free-solid-svg-icons"


const HeaderLog = ({ onLogout }) => {

  const navigate = useNavigate();

  const onClickLougout = (event) => {
    event.preventDefault();
    navigate('/');
    localStorage.removeItem('login');
  };

  return (
    <>
        <header>
          <div className="header-container-log">
            <div className="header-img">
              <img className="header-logo" src={logo} alt="Logo Groupomania" />
            </div>
            <div className="header-logout">
              <a href={"##"} className="active-logout" onClick={onClickLougout}>
                <FontAwesomeIcon className="header-logout" icon={faSignOut}></FontAwesomeIcon> 
              </a> 
              
            </div>
            
          </div>                 
        </header>
    </>
  );
};

export default HeaderLog;
