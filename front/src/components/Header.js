import React, { useContext } from "react";
import logo from "../assets/icons/icon-left-font.png";
import { NavLink } from "react-dom";
import { UidContext } from "./AppContext";

const Header = () => {
  const uid = useContext(UidContext);

  return (
    <nav>
      {uid ? (
        <>
          <img className="header-logo" src={logo} alt="Logo Groupomania" />
          logo Logout
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
