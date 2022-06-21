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
  profit_or_loss,
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
        <p>$ {buyprice?.toFixed(2)}</p>
      </div>
      <div
        className={
          profit_or_loss >= 0
            ? "coinrowwallet-coin-profit-loss-green"
            : "coinrowwallet-coin-profit-loss-red"
        }
      >
        <b>$ {profit_or_loss?.toFixed(2)}</b>
      </div>
    </div>
  );
}

export default CoinRowWallet;
