import "./styles.css";
import { FaTrashAlt } from "react-icons/fa";

function CoinRowWallet({
  id,
  handleDelete,
  icon,
  name,
  symbol,
  price,
  market_cap,
}) {
  return (
    <div className="coinrow-container">
      <div className="coinrow-coin-remove">
        <FaTrashAlt onClick={() => handleDelete(id)} />
      </div>
      <div className="coinrow-coin-icon">
        <img src={icon} alt={name} />
      </div>
      <div className="coinrow-coin-name">
        <h4>{name}</h4>
      </div>
      <div className="coinrow-coin-symbol">
        <h3>{symbol}</h3>
      </div>
      <div className="coinrow-coin-price">
        <p>$ {price}</p>
      </div>
      <div className="coinrow-coin-quantity">
        <p>358.000.000</p>
      </div>
      <div className="coinrow-coin-profit-loss">
        <p>$ {market_cap.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default CoinRowWallet;
