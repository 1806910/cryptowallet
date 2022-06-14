import "./styles.css";
import { MdRemoveCircle } from "react-icons/md";

function CoinRowWallet({ id, handleDelete, icon, name, symbol, price }) {
  return (
    <div className="coinrowwallet-container">
      <div className="coinrowwallet-coin-remove">
        <MdRemoveCircle
          onClick={() => handleDelete(id)}
          size={25}
          color="red"
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
        <p>*</p>
      </div>
      <div className="coinrowwallet-coin-buyprice">
        <p>$0,00</p>
      </div>
      <div className="coinrowwallet-coin-profit-loss">
        <p>$0,000</p>
      </div>
    </div>
  );
}

export default CoinRowWallet;
