import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsCurrencyExchange } from "react-icons/bs";
import { BeatLoader } from "react-spinners";
import Header from "../../Components/Header/Header";
import RowExchange from "../../Components/RowExchange/RowExchange";
import SideMenu from "../../Components/SideMenu/SideMenu";
import "./styles.css";

function Exchanges() {
  const [exchangeList, setExchangeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/exchanges")
      .then((res) => {
        setExchangeList(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="exchange-side-menu">
        <SideMenu />
      </div>
      <div className="exchange-container">
        <Header
          hasSearchBar={false}
          title="Exchanges"
          icon={<BsCurrencyExchange size={35} />}
        />
        <div className="exchange-table-header">
          <div className="exchange-coin-add">
            <h5>#</h5>
          </div>
          <div className="exchange-coin-name">
            <h5>Exchange</h5>
          </div>
          <div className="exchange-coin-price">
            <h5>Country</h5>
          </div>
          <div className="exchange-coin-change">
            <h5>Year</h5>
          </div>
        </div>
        <div className="exchange-container-content">
          {loading ? (
            <BeatLoader loading={loading} size={15} color="white" />
          ) : (
            exchangeList &&
            exchangeList?.map((exchange) => {
              return (
                <RowExchange
                  key={exchange?.id}
                  id={exchange?.id}
                  icon={exchange?.image}
                  name={exchange?.name}
                  trust_score_rank={exchange?.trust_score_rank}
                  country={exchange?.country}
                  year_established={exchange?.year_established}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default Exchanges;
