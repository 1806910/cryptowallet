import React from "react";
import ReactTradingviewWidget from "react-tradingview-widget";

function Chart() {
  return (
    <ReactTradingviewWidget theme='Dark' symbol="BTC" locale="br" />
  );
}

export default Chart;
