import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import Header from "../../Components/Header/Header";
import SideMenu from "../../Components/SideMenu/SideMenu";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

function CoinList() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      )
      .then((res) => {
        setLoading(false);
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <>
      <div className="coinlist-side-menu">
        <SideMenu />
      </div>

      <div className="coinlist-container-content">
        <Header setSearch={setSearch} />
        {loading ? (
          <BeatLoader loading={loading} size={15} color="white" />
        ) : (
          filteredCoins.map((coin) => {
            return (
              <div className="coin-container" key={coin.id}>
                <div
                  className="coin-row"
                  onClick={() => {
                    navigate(`/coin/${coin.id}`);
                  }}
                >
                  <div className="coin-view-div-1">
                    <img src={coin.image} alt={coin.name}></img>
                    <h1>{coin.name}</h1>
                    <p className="coin-symbol">{coin.symbol}</p>
                  </div>
                  <div className="coin-view-div-2">
                    <p className="coin-price">${coin.current_price}</p>
                    <p className="coin-marketcap">
                      ${coin.market_cap.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default CoinList;
