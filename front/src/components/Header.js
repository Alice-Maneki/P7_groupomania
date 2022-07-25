/* header présentsur la page Home */
import React from "react";
import logo from "../assets/icons/icon-left-font.png";


const Header = () => {
  

  return (
   
        <header>
          <div className="header-container">
            <img className="header-logo" src={logo} alt="Logo Groupomania" />
          </div>
        </header>
    
  );
};

export default Header;
