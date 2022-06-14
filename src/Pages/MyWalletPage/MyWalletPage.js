import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import CoinRowWallet from "../../Components/CoinRowWallet/CoinRowWallet";
import Header from "../../Components/Header/Header";
import SideMenu from "../../Components/SideMenu/SideMenu";
import api from "../../config/api/api";
import { Context } from "../../Context/AuthContext";
import "./styles.css";

function MyWalletPage() {
  const { user, handleSetRequestTrue, authenticated } = useContext(Context);
  const [addedCoins, setAddedCoins] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authenticated) {
      handleSetRequestTrue();
    }
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
        )
        .then((res) => {
          verifyAddedCoins(res.data);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  function verifyAddedCoins(coins) {
    let auxArray = [];
    for (let i = 0; i < coins.length; i++) {
      if (user?.added_coins.includes(coins[i].id)) {
        auxArray.push(coins[i]);
      }
    }
    setAddedCoins(auxArray);
  }

  function handleDelete(id) {
    let userId = user.id;
    let coinId = id;

    api
      .delete(`/delete-coin/${userId}/${coinId}`)
      .then((res) => {
        let newAddedCoinsArray = [];
        addedCoins.forEach((coin) => {
          if (res.data.newArray.includes(coin.id)) {
            newAddedCoinsArray.push(coin);
          }
        });
        setAddedCoins(newAddedCoinsArray);
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      <div className="mywallet-side-menu">
        <SideMenu />
      </div>

      <div className="mywallet-container">
        <Header />
        <div className="mywallet-table-header">
          <div className="mywallet-coin-remove">
            <h5>#</h5>
          </div>
          <div className="mywallet-coin-name">
            <h5>Coin</h5>
          </div>
          <div className="mywallet-coin-symbol">
            <h5>Symbol</h5>
          </div>
          <div className="mywallet-coin-price">
            <h5>Price</h5>
          </div>
          <div className="mywallet-coin-quantity">
            <h5>Quantity</h5>
          </div>
          <div className="mywallet-coin-buyprice">
            <h5>Buy Price</h5>
          </div>
          <div className="mywallet-coin-profit-loss">
            <h5>Profit / Loss</h5>
          </div>
        </div>
        <div className="mywallet-container-content">
          {loading ? (
            <BeatLoader loading={loading} size={15} color="white" />
          ) : (
            addedCoins &&
            addedCoins.map((coin) => {
              return (
                <CoinRowWallet
                  key={coin.id}
                  id={coin.id}
                  handleDelete={handleDelete}
                  icon={coin.image}
                  name={coin.name}
                  symbol={coin.symbol}
                  price={coin.current_price}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default MyWalletPage;
