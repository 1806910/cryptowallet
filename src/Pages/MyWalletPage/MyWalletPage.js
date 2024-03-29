import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import CoinRowWallet from "../../Components/CoinRowWallet/CoinRowWallet";
import Header from "../../Components/Header/Header";
import Modal from "../../Components/Modal/Modal";
import SideMenu from "../../Components/SideMenu/SideMenu";
import api from "../../config/api/api";
import { Context } from "../../Context/AuthContext";
import { FaWallet } from "react-icons/fa";
import "./styles.css";

function MyWalletPage() {
  const { user, handleSetRequestTrue, authenticated } = useContext(Context);
  const [addedCoins, setAddedCoins] = useState();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState({});
  const [updatedCoin, setUpdatedCoin] = useState({});

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

  function handleCalculateProfit(coinList) {
    let auxArray = [];
    coinList?.forEach((coin) => {
      coin.profit_or_loss =
        coin.qtt * coin.current_price - coin.qtt * coin.buyprice;
      auxArray.push(coin);
    });
    setAddedCoins(auxArray);
  }

  function verifyAddedCoins(coins) {
    let auxArray = [];
    for (let i = 0; i < coins.length; i++) {
      for (let j = 0; j < user?.teste_json?.length; j++) {
        if (user?.teste_json[j].coin === coins[i].id) {
          coins[i].qtt = Number(user.teste_json[j].qtt);
          coins[i].buyprice = Number(user.teste_json[j].buyprice);
          auxArray.push(coins[i]);
        }
      }
    }
    handleCalculateProfit(auxArray);
  }

  function handleDelete(id) {
    let userId = user.id;
    let coinId = id;

    api
      .delete(`/delete-coin/${userId}/${coinId}`)
      .then((res) => {
        let newAddedCoinsArray = [];

        addedCoins.forEach((coin) => {
          if (coin.id !== coinId) {
            newAddedCoinsArray.push(coin);
          }
        });
        setAddedCoins(newAddedCoinsArray);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    let auxArray = [];

    addedCoins?.forEach((coin) => {
      if (coin.id === updatedCoin.id) {
        coin.qtt = Number(updatedCoin.qtt);
        coin.buyprice = Number(updatedCoin.buyprice);
      }
      auxArray.push(coin);
    });
    handleCalculateProfit(auxArray);
  }, [updatedCoin]);

  return (
    <>
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          selectedCoin={selectedCoin}
          setUpdatedCoin={setUpdatedCoin}
        />
      )}

      <div className="mywallet-side-menu">
        <SideMenu />
      </div>

      <div className="mywallet-container">
        <Header
          hasSearchBar={false}
          title="My Wallet"
          icon={<FaWallet size={35} />}
        />
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
                  qtt={coin.qtt}
                  buyprice={coin.buyprice}
                  profit_or_loss={coin.profit_or_loss}
                  setIsOpen={setIsOpen}
                  setSelectedCoin={setSelectedCoin}
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
