import { BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import RouteConfig from "./config/routes";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return <RouteConfig />;
}

export default App;
