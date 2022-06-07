import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import Header from "../../Components/Header/Header";
import SideMenu from "../../Components/SideMenu/SideMenu";
import { BeatLoader } from "react-spinners";
import { Context } from "../../Context/AuthContext";
import CoinRowList from "../../Components/CoinRowList/CoinRowList";
import api from "../../config/api/api";
import { useNavigate } from "react-router-dom";

function CoinList() {
  const { authenticated, handleSetRequestTrue, user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [addedCoins, setAddedCoins] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      handleSetRequestTrue();
    }
  }, []);

  useEffect(() => {
    if (user) {
      setAddedCoins(user.added_coins);
    }
  }, [user]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLocaleLowerCase())
  );

  function handleDelete(id) {
    console.log("delete", id);
  }

  function handleAdd(id) {
    if (authenticated) {
      let userId = user.id;
      let coinId = id;

      api
        .post("/add-coin", JSON.stringify({ userId, coinId }), {
          headers: { "Content-type": "Application/json" },
        })
        .then((res) => {
          setAddedCoins(res.data.newAddedCoinsList);
          console.log(res);
        })
        .catch((error) => console.log(error));
    } else {
      navigate("/login");
    }
  }

  return (
    <>
      <div className="coinlist-side-menu">
        <SideMenu />
      </div>
      <div className="coinlist-container">
        <Header setSearch={setSearch} />
        <div className="coinlist-table-header">
          <div className="coinlist-coin-add">
            <h4>#</h4>
          </div>
          <div className="coinlist-coin-name">
            <h4>Coin</h4>
          </div>
          <div className="coinlist-coin-symbol">
            <h4>Symbol</h4>
          </div>
          <div className="coinlist-coin-price">
            <h4>Price</h4>
          </div>
          <div className="coinlist-coin-change">
            <h4>Price Change 24h</h4>
          </div>
          <div className="coinlist-coin-marketcap">
            <h4>Market Cap</h4>
          </div>
        </div>
        <div className="coinlist-container-content">
          {loading ? (
            <BeatLoader loading={loading} size={15} color="white" />
          ) : (
            filteredCoins.map((coin) => {
              const isAdded = addedCoins?.includes(coin.id);
              return (
                <CoinRowList
                  key={coin.id}
                  id={coin.id}
                  icon={coin.image}
                  name={coin.name}
                  symbol={coin.symbol}
                  price={coin.current_price}
                  price_change_percentage_24h={coin.price_change_percentage_24h}
                  market_cap={coin.market_cap}
                  handleDelete={handleDelete}
                  handleAdd={handleAdd}
                  isAdded={isAdded && authenticated}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default CoinList;
