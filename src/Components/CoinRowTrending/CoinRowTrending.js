import "./styles.css";

function CoinRowTrending({
  id,
  icon,
  name,
  symbol,
  price_btc,
  market_cap_rank,
  rank,
}) {
  return (
    <div className="coinrowtrending-container">
      <div className="coinrowtrending-coin-add">{rank}</div>
      <div className="coinrowtrending-coin-icon">
        <img src={icon} alt={name} />
      </div>
      <div className="coinrowtrending-coin-name">
        <h5>{name}</h5>
      </div>
      <div className="coinrowtrending-coin-symbol">
        <h5>{symbol}</h5>
      </div>
      <div className="coinrowtrending-coin-marketcap">
        <p>{market_cap_rank}</p>
      </div>
      <div className="coinrowtrending-coin-price">
        <p>$ {price_btc}</p>
      </div>
    </div>
  );
}

export default CoinRowTrending;
