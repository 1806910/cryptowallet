import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillFire } from "react-icons/ai";
import { BeatLoader } from "react-spinners";
import CoinRowTrending from "../../Components/CoinRowTrending/CoinRowTrending";
import Header from "../../Components/Header/Header";
import SideMenu from "../../Components/SideMenu/SideMenu";
import "./styles.css";

function TrendingCoins() {
  const [coinList, setCoinList] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/search/trending")
      .then((res) => {
        setCoinList(res.data.coins);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="trending-side-menu">
        <SideMenu />
      </div>
      <div className="trending-container">
        <Header
          hasSearchBar={false}
          title="Trending Coins"
          icon={<AiFillFire size={35} />}
        />
        <div className="trending-table-header">
          <div className="trending-coin-add">
            <h5>#</h5>
          </div>
          <div className="trending-coin-name">
            <h5>Coin</h5>
          </div>
          <div className="trending-coin-symbol">
            <h5>Symbol</h5>
          </div>
          <div className="trending-coin-marketcap">
            <h5>Market Cap Rank</h5>
          </div>
          <div className="trending-coin-price">
            <h5>Price</h5>
          </div>
        </div>
        <div className="trending-container-content">
          {loading ? (
            <BeatLoader loading={loading} size={15} color="white" />
          ) : (
            coinList &&
            coinList?.map((coin, index) => {
              return (
                <CoinRowTrending
                  key={coin.item.id}
                  id={coin.item.id}
                  icon={coin.item.small}
                  name={coin.item.name}
                  symbol={coin.item.symbol}
                  price_btc={coin.item.price_btc}
                  market_cap_rank={coin.item.market_cap_rank}
                  rank={index + 1}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default TrendingCoins;
