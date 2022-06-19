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
      let userCoins = [];
      user?.teste_json?.forEach((obj) => {
        userCoins.push(obj.coin);
      });
      setAddedCoins(userCoins);
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
    let userId = user.id;
    let coinId = id;

    api
      .delete(`/delete-coin/${userId}/${coinId}`)
      .then((res) => {
        let newAddedCoinsArray = [];
        addedCoins.forEach((coin) => {
          if (coin !== coinId) {
            newAddedCoinsArray.push(coin);
          }
        });
        setAddedCoins(newAddedCoinsArray);
      })
      .catch((error) => console.log(error));
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
          let coinsId = [];
          res.data.newAddedCoinsList.forEach((obj) => {
            coinsId.push(obj.coin);
          });
          setAddedCoins([...coinsId]);
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
            <h5>#</h5>
          </div>
          <div className="coinlist-coin-name">
            <h5>Coin</h5>
          </div>
          <div className="coinlist-coin-symbol">
            <h5>Symbol</h5>
          </div>
          <div className="coinlist-coin-price">
            <h5>Price</h5>
          </div>
          <div className="coinlist-coin-change">
            <h5>Price Change 24h</h5>
          </div>
          <div className="coinlist-coin-marketcap">
            <h5>Market Cap</h5>
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
