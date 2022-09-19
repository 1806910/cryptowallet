import "./styles.css";

function RowExchange({
  id,
  icon,
  name,
  trust_score_rank,
  country,
  year_established,
}) {
  return (
    <div className="rowexchange-container">
      <div className="rowexchange-coin-add">{trust_score_rank}</div>
      <div className="rowexchange-coin-icon">
        <img src={icon} alt={name} />
      </div>
      <div className="rowexchange-coin-name">
        <h5>{name}</h5>
      </div>
      <div className="rowexchange-coin-marketcap">
        <p>{country}</p>
      </div>
      <div className="rowexchange-coin-price">
        <p>{year_established}</p>
      </div>
    </div>
  );
}

export default RowExchange;
