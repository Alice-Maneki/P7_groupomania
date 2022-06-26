import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/icons/icon-left-font.png";
import { UidContext } from "./AppContext";

const Header = () => {
  const uid = useContext(UidContext);

  return (
    <nav>
      {/* si on est connecté (uid existe) on a le header avec l'icône pour se déconnecter
      sinon seulement le logo apparaît */}
      {uid ? (
        <>
          <div className="header-container">
            <div className="header-img">
              <img className="header-logo" src={logo} alt="Logo Groupomania" />
            </div>
            <div className="header-logout">
              <NavLink to='/' exact activeClassName="actice-logout">
                <i className="fa-solid fa-person-from-portal"></i>
              </NavLink>  
            </div>
          </div>                 
        </>
      ) : (
        <>
          <div className="header-container">
            <img className="header-logo" src={logo} alt="Logo Groupomania" />
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;
