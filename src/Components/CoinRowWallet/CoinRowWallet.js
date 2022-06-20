import "./styles.css";
import { MdRemoveCircle, MdModeEdit } from "react-icons/md";

function CoinRowWallet({
  id,
  handleDelete,
  icon,
  name,
  symbol,
  price,
  qtt,
  buyprice,
  setIsOpen,
  setSelectedCoin,
}) {
  return (
    <div className="coinrowwallet-container">
      <div className="coinrowwallet-coin-remove">
        <MdRemoveCircle
          onClick={() => handleDelete(id)}
          size={20}
          color="red"
        />
        <MdModeEdit
          onClick={() => {
            setIsOpen(true);
            setSelectedCoin({
              coinIcon: icon,
              coinName: name,
              coinId: id,
            });
          }}
          size={20}
          color="white"
        />
      </div>
      <div className="coinrowwallet-coin-icon">
        <img src={icon} alt={name} />
      </div>
      <div className="coinrowwallet-coin-name">
        <h5>{name}</h5>
      </div>
      <div className="coinrowwallet-coin-symbol">
        <h5>{symbol}</h5>
      </div>
      <div className="coinrowwallet-coin-price">
        <p>$ {price}</p>
      </div>
      <div className="coinrowwallet-coin-quantity">
        <p>{qtt}</p>
      </div>
      <div className="coinrowwallet-coin-buyprice">
        <p>$ {buyprice.toFixed(2)}</p>
      </div>
      <div className="coinrowwallet-coin-profit-loss">
        <p>$ </p>
      </div>
    </div>
  );
}

export default CoinRowWallet;
