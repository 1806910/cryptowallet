import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api/api";

const Context = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState();
  let navigate = useNavigate();

  //Manter usuário logado após reload da página
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (authenticated) { 
      (async () => {
        const response = await api.post(
          "/user-data",
          JSON.stringify({token}),
          {
            headers: { "Content-type": "Application/json" },
          }
        );
        setUser(response.data.user);
      })();
      console.log("Fez request")
    }
  }, [authenticated]);

  function handleAuth(data) {
    localStorage.setItem("token", JSON.stringify(data.token));
    api.defaults.headers.Authorization = `Bearer ${data.token}`;
    setAuthenticated(true);
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
        handleAuth,
        handleLogout,
        user,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
