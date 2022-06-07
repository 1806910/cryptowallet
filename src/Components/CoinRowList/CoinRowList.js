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
            size={25}
            color="red"
          />
        ) : (
          <MdAddCircle onClick={() => handleAdd(id)} size={25} />
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
        <h4>{name}</h4>
      </div>
      <div className="coinrowlist-coin-symbol">
        <h3>{symbol}</h3>
      </div>
      <div className="coinrowlist-coin-price">
        <p>$ {price}</p>
      </div>
      <div
        className={
          price_change_percentage_24h < 0
            ? "coinrowlist-coin-change-red"
            : "coinrowlist-coin-change-green"
        }
      >
        <p>{price_change_percentage_24h.toFixed(2)}%</p>
      </div>
      <div className="coinrowlist-coin-marketcap">
        <p>$ {market_cap.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default CoinRowList;
