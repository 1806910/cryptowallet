import React, { useContext, useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import Header from "../../Components/Header/Header";
import SideMenu from "../../Components/SideMenu/SideMenu";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { Context } from "../../Context/AuthContext";
import CoinRowWallet from "../../Components/CoinRowWallet/CoinRowWallet";

function CoinList() {
  const { authenticated, handleSetRequestTrue } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  let navigate = useNavigate();
  /*
  useEffect(() => {
    if (authenticated) {
      console.log("entrou request");
      handleSetRequestTrue();
    }
  }, [authenticated]);
*/
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

  return (
    <>
      <div className="coinlist-side-menu">
        <SideMenu />
      </div>
      <div className="coinlist-container">
        <Header setSearch={setSearch} />
        <div className="coinlist-table-header">
          <div className="coinlist-coin-remove">
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
          <div className="coinlist-coin-quantity">
            <h4>Quantity</h4>
          </div>
          <div className="coinlist-coin-profit-loss">
            <h4>Profit / Loss</h4>
          </div>
        </div>
        <div className="coinlist-container-content">
          {loading ? (
            <BeatLoader loading={loading} size={15} color="white" />
          ) : (
            filteredCoins.map((coin) => {
              return (
                <div
                  className="coinlist-row"
                  onClick={() => {
                    navigate(`/coin/${coin.id}`);
                  }}
                >
                  <CoinRowWallet
                    key={coin.id}
                    id={coin.id}
                    icon={coin.image}
                    name={coin.name}
                    symbol={coin.symbol}
                    price={coin.current_price}
                    market_cap={coin.market_cap}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default CoinList;
