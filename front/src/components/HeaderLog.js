/* header présent sur la page Trending */
import React from "react";
import logo from "../assets/icons/icon-left-font.png";
import { logout } from '../services/functions.auth';
import { useNavigate } from "react-router-dom";



const HeaderLog = ({ onLogout }) => {

  const navigate = useNavigate();

  const onClickLougout = (event) => {
    event.preventDefault();
    logout();
    onLogout();
    navigate.push('/');
  };

  return (
    <>
        <header>
          <div className="header-container">
            <div className="header-img">
              <img className="header-logo" src={logo} alt="Logo Groupomania" />
            </div>
            <div className="header-logout">
              <a href={"##"} className="active-logout" onClick={onClickLougout}>
              <i className="fa-solid fa-person-to-door"></i>
              </a>  
            </div>
          </div>                 
        </header>
    </>
  );
};

export default HeaderLog;
