import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api/api";
import RouteConfig from "../config/routes";

const Context = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState();
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      (async () => {
        const { data } = await api.get("/mywallet");
        setUser(data);
        console.log("Fez um request")
      })();
    }
  }, [authenticated]);

  async function handleLogin() {
    const {
      data: { token },
    } = await api.post("/login");
    localStorage.setItem("token", JSON.stringify(token));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setAuthenticated(true);
    navigate("/");
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    navigate("/login");
  }

  return (
    <Context.Provider
      value={{
        authenticated,
        handleLogin,
        handleLogout,
        user,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
