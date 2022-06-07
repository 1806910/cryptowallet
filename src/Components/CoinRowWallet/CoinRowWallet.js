import "./styles.css";
import { MdRemoveCircle } from "react-icons/md";

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
    <div className="coinrowwallet-container">
      <div className="coinrowwallet-coin-remove">
        <MdRemoveCircle onClick={() => handleDelete(id)} size={25} color='red'/>
      </div>
      <div className="coinrowwallet-coin-icon">
        <img src={icon} alt={name} />
      </div>
      <div className="coinrowwallet-coin-name">
        <h4>{name}</h4>
      </div>
      <div className="coinrowwallet-coin-symbol">
        <h3>{symbol}</h3>
      </div>
      <div className="coinrowwallet-coin-price">
        <p>$ {price}</p>
      </div>
      <div className="coinrowwallet-coin-quantity">
        <p>*</p>
      </div>
      <div className="coinrowwallet-coin-profit-loss">
        <p>$0,000</p>
      </div>
    </div>
  );
}

export default CoinRowWallet;
