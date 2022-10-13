import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsGraphDown } from "react-icons/bs";
import { BeatLoader } from "react-spinners";
import CoinRowList from "../../Components/CoinRowList/CoinRowList";
import Header from "../../Components/Header/Header";
import SideMenu from "../../Components/SideMenu/SideMenu";
import "./styles.css";

function LowPerfCoins() {
  const [coinList, setCoinList] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      )
      .then((res) => {
        let newArray = [];

        res.data.sort(
          (a, b) =>
            a.price_change_percentage_24h - b.price_change_percentage_24h
        );
        for (let i = 0; i < 7; i++) {
          newArray.push(res.data[i]);
        }
        setCoinList(newArray);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="coinlist-side-menu">
        <SideMenu />
      </div>
      <div className="coinlist-container">
        <Header
          icon={<BsGraphDown size={35} />}
          title={"Low Performance 24h"}
        />
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
            coinList.map((coin) => {
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
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default LowPerfCoins;
