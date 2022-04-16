import React, { useContext, useState } from "react";
import "./styles.css";
import { RiUserFill } from "react-icons/ri";
import { BsFillLockFill } from "react-icons/bs";
import { Context } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { handleLogin } = useContext(Context);

  return (
    <div className="login-container">
      <div className="rows-container">
        <div className="row-user">
          <RiUserFill className="user-icon" />
          <input
            type="text"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="row-password">
          <BsFillLockFill className="password-icon" />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="row-button">
          <Link to={'/'} className="link-button">Coin list view >></Link>
          <button type="submit" onClick={handleLogin}>Login</button>
        </div>
        </div>
    </div>
  );
}

export default LoginPage;
