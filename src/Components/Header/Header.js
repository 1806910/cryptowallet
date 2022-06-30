import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/AuthContext";
import { FaWallet } from "react-icons/fa";

import "./styles.css";

function Header({ setSearch, hasSearchBar }) {
  const { authenticated, handleLogout } = useContext(Context);
  let navigate = useNavigate();
  function handleChange(e) {
    setSearch(e.target.value);
  }

  return (
    <div className="search-container">
      <div className="search-container-column1"></div>
      <div className="search-container-column2">
        {hasSearchBar ? (
          <input type="text" placeholder="Search" onChange={handleChange} />
        ) : (
          <>
            <FaWallet size={35}/>
            <h1>My Wallet</h1>
          </>
        )}
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
