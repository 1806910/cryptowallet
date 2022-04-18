import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import CoinRow from "../../Components/CoinRow/Coin";
import SideMenu from "../../Components/SideMenu/SideMenu";
import api from "../../config/api/api";
import { Context } from "../../Context/AuthContext";
import "./styles.css";

function MyWalletPage() {
  const { handleLogout, user } = useContext(Context);
  const [addedCoins, setAddedCoins] = useState();

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
      )
      .then((res) => {
        if (user) {
          verifyAddedCoins(res.data);
        }
      })
      .catch((error) => console.log(error));
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
    let newAddedCoinsArray = addedCoins.filter((item) => item.id !== id);
    api
      .post("/delete-coin", JSON.stringify({ userId, newAddedCoinsArray }), {
        headers: { "Content-type": "Application/json" },
      })
      .then((res) => {
        console.log("delete retornou isso", res.data.newArray.added_coins);
        let newAddedCoinsArray = addedCoins.filter((item) => item.id !== id);
        //setAddedCoins(res.data.newArray.added_coins);
        setAddedCoins(newAddedCoinsArray);
      });
  }

  return (
    <>
      <div className="mywallet-side-menu">
        <SideMenu />
      </div>

      <div className="mywallet-container">
        <div className="mywallet-table-header">
          <div className="mywallet-coin-remove">
            <h3>#</h3>
          </div>
          <div className="mywallet-coin-name">
            <h3>Coin</h3>
          </div>
          <div className="mywallet-coin-symbol">
            <h3>Symbol</h3>
          </div>
          <div className="mywallet-coin-price">
            <h3>Price</h3>
          </div>
          <div className="mywallet-coin-market-cap">
            <h3>Market Cap</h3>
          </div>
        </div>
        <div className="coinrow-container-content">
          {addedCoins ? (
            addedCoins?.map((coin) => {
              return (
                <CoinRow
                  key={coin.id}
                  id={coin.id}
                  handleDelete={handleDelete}
                  icon={coin.image}
                  name={coin.name}
                  symbol={coin.symbol}
                  price={coin.current_price}
                  market_cap={coin.market_cap}
                />
              );
            })
          ) : (
            <BeatLoader size={15} color="white" />
          )}
        </div>
      </div>
    </>
  );
}

export default MyWalletPage;
