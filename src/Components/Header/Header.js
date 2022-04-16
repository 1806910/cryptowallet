import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/AuthContext";

import "./styles.css";

function Header({ setSearch }) {
  const { authenticated, handleLogout } = useContext(Context);
  let navigate = useNavigate();
  function handleChange(e) {
    setSearch(e.target.value);
  }

  return (
    <div className="search-container">
      <div className="search-container-column1"></div>
      <div className="search-container-column2">
        <input type="text" placeholder="Search" onChange={handleChange} />
      </div>
      <div className="search-container-column3">
        {authenticated ? (
          <button onClick={handleLogout}>LOGOUT</button>
        ) : (
          <button onClick={() => navigate("/login")}>LOGIN</button>
        )}
      </div>
    </div>
  );
}

export default Header;
