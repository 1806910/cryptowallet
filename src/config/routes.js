import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Chart from "../Components/Chart/Chart";
import { Context } from "../Context/AuthContext";
import CoinInfo from "../Pages/CoinInfo/CoinInfo";
import CoinList from "../Pages/CoinList/CoinList";
import Exchanges from "../Pages/Exchanges/Exchanges";
import LoginPage from "../Pages/LoginPage/LoginPage";
import LowPerfCoins from "../Pages/LowPerfCoins/LowPerfCoins";
import MyWalletPage from "../Pages/MyWalletPage/MyWalletPage";
import TopPerfCoins from "../Pages/TopPerfCoins/TopPerfCoins";
import TrendingCoins from "../Pages/TrendingCoins/TrendingCoins";

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
      <Route path="/trending-coins" element={<TrendingCoins />} />
      <Route path="/exchanges" element={<Exchanges />} />
      <Route path="/top-perf-coins" element={<TopPerfCoins />} />
      <Route path="/low-perf-coins" element={<LowPerfCoins />} />
    </Routes>
  );
}

export default RouteConfig;
