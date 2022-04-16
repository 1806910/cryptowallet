import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Chart from "../Components/Chart/Chart";
import { Context } from "../Context/AuthContext";
import CoinInfo from "../Pages/CoinInfo/CoinInfo";
import CoinList from "../Pages/CoinList/CoinList";
import LoginPage from "../Pages/LoginPage/LoginPage";
import MyWalletPage from "../Pages/MyWalletPage/MyWalletPage";

function RouteConfig() {
  const { authenticated } = useContext(Context);
  return (
    <Routes>
      <Route path="/" element={<CoinList />} />
      <Route
        path="/login"
        element={authenticated ? <MyWalletPage /> : <LoginPage />}
      />
      <Route path="/coin/:coinId" element={<CoinInfo />} />
      <Route path="/chart" element={<Chart />} />
      <Route
        path="/mywallet"
        element={authenticated ? <MyWalletPage /> : <LoginPage />}
      />
    </Routes>
  );
}

export default RouteConfig;
