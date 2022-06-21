import React, { useContext, useState } from "react";
import api from "../../config/api/api";
import { Context } from "../../Context/AuthContext";
import "./styles.css";

function Modal({ setIsOpen, selectedCoin, setSelectedCoin, setUpdatedCoin }) {
  const [selectedCoinQTT, setSelectedCoinQTT] = useState();
  const [selectedCoinBuyprice, setSelectedCoinBuyprice] = useState();
  const { authenticated, user } = useContext(Context);

  function handleSave(e) {
    e.preventDefault();

    if (authenticated) {
      let userId = user.id;
      let coinId = selectedCoin.coinId;
      let coinQTT = selectedCoinQTT;
      let coinBuyprice = selectedCoinBuyprice;

      api
        .post(
          "/edit",
          JSON.stringify({ userId, coinId, coinQTT, coinBuyprice }),
          {
            headers: { "Content-type": "Application/json" },
          }
        )
        .then((res) => {
          let newAddedCoinsArray = res.data.newAddedCoinsArray;
          console.log("foi", newAddedCoinsArray);

          setIsOpen(false);
          setUpdatedCoin({
            id: coinId,
            qtt: coinQTT,
            buyprice: coinBuyprice,
          });
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className="modal-wrapper">
      <div className="modal-container">
        <div className="modal-close-button">
          <button onClick={() => setIsOpen(false)}>X</button>
        </div>
        <div className="modal-form">
          <div className="modal-icon-row">
            <img src={selectedCoin.coinIcon} alt={selectedCoin.coinName} />
            <h3>{selectedCoin.coinName}</h3>
          </div>
          <div className="modal-input1">
            <input
              placeholder="Quantity"
              onChange={(e) => setSelectedCoinQTT(e.target.value)}
            />
          </div>
          <div className="modal-input2">
            <input
              placeholder="Buy price"
              onChange={(e) => setSelectedCoinBuyprice(e.target.value)}
            />
          </div>
          <div className="modal-submit-button">
            <button type="submit" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
