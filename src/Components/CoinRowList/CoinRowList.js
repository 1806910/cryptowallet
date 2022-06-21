import "./styles.css";
import { MdAddCircle } from "react-icons/md";
import { MdRemoveCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function CoinRowList({
  id,
  icon,
  name,
  symbol,
  price,
  price_change_percentage_24h,
  market_cap,
  handleDelete,
  handleAdd,
  isAdded,
}) {
  let navigate = useNavigate();

  return (
    <div className="coinrowlist-container">
      <div className="coinrowlist-coin-add">
        {isAdded ? (
          <MdRemoveCircle
            onClick={() => handleDelete(id)}
            size={20}
            color="red"
          />
        ) : (
          <MdAddCircle onClick={() => handleAdd(id)} size={20} />
        )}
      </div>
      <div className="coinrowlist-coin-icon">
        <img src={icon} alt={name} />
      </div>
      <div
        className="coinrowlist-coin-name"
        onClick={() => {
          navigate(`/coin/${id}`);
        }}
      >
        <h5>{name}</h5>
      </div>
      <div className="coinrowlist-coin-symbol">
        <h5>{symbol}</h5>
      </div>
      <div className="coinrowlist-coin-price">
        <p>$ {price}</p>
      </div>
      <div
        className={
          price_change_percentage_24h >= 0
            ? "coinrowlist-coin-change-green"
            : "coinrowlist-coin-change-red"
        }
      >
        <b>{price_change_percentage_24h?.toFixed(2)}%</b>
      </div>
      <div className="coinrowlist-coin-marketcap">
        <p>$ {market_cap.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default CoinRowList;
