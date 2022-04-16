import React, { useEffect, useState } from "react";
import axios from "axios";
import SideMenu from "../../Components/SideMenu/SideMenu";
import { useParams } from "react-router-dom";
import "./styles.css";
import ReactTradingviewWidget from "react-tradingview-widget";
import { BeatLoader } from "react-spinners";

function CoinInfo() {
  const [loading, setLoading] = useState(true);
  const [coin, setCoin] = useState();

  let { coinId } = useParams();

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${coinId}`)
      .then((res) => {
        setLoading(false);
        setCoin(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, [coinId]);

  return (
    <>
      <div className="coininfo-side-menu">
        <SideMenu />
      </div>

      <div className="coininfo-container-content">
        {loading ? (
          <BeatLoader loading={loading} size={15} color="white" />
        ) : (
          <div className="coininfo-div-0">
            <div className="coininfo-div-1">
              <img src={coin?.image.small} alt={coin?.name} />
              <h1>
                {coin?.name}
                <span>({coin?.symbol})</span>
              </h1>
              <p>#: {coin?.market_cap_rank}</p>
            </div>
            <div className="coininfo-div-2">
              <div>
                <h2>
                  $
                  {coin?.market_data.current_price.usd <= 1
                    ? coin?.market_data.current_price.usd
                    : coin?.market_data.current_price.usd.toLocaleString()}
                </h2>
              </div>
              <div>
                <h6>
                  Max supply: <br />$
                  {coin?.market_data.max_supply?.toLocaleString()}
                </h6>
              </div>
              <div>
                <h6>
                  High 24h: <br />$
                  {coin?.market_data.high_24h.usd <= 1
                    ? coin?.market_data.high_24h.usd
                    : coin?.market_data.high_24h.usd.toLocaleString()}
                </h6>
              </div>
              <div>
                <h6>
                  Low 24h: <br />$
                  {coin?.market_data.low_24h.usd <= 1
                    ? coin?.market_data.low_24h.usd
                    : coin?.market_data.low_24h.usd.toLocaleString()}
                </h6>
              </div>
            </div>
          </div>
        )}
        <div className="coininfo-chart">
          <ReactTradingviewWidget symbol={coin?.symbol + "USDT"} />
        </div>
      </div>
    </>
  );
}

export default CoinInfo;
