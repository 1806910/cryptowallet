import React from "react";
import { FaWallet } from "react-icons/fa";
import { SiBitcoinsv } from "react-icons/si";
import { AiFillFire } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import { BsCurrencyExchange, BsGraphDown, BsGraphUp } from "react-icons/bs";

const sideMenuData = [
  {
    title: "Coin View",
    icon: <SiBitcoinsv />,
    url: "/",
  },
  {
    title: "My Wallet",
    icon: <FaWallet />,
    url: "/mywallet",
  },
  {
    title: "Trending Coins",
    icon: <AiFillFire />,
    url: "/trending-coins",
  },
  {
    title: "Exchanges",
    icon: <BsCurrencyExchange />,
    url: "/exchanges",
  },
  {
    title: "Top Performance 24h",
    icon: <BsGraphUp />,
    url: "/top-perf-coins",
  },
  {
    title: "Low Performance 24h",
    icon: <BsGraphDown />,
    url: "/low-perf-coins",
  },
];

function SideMenu() {
  let navigate = useNavigate();
  return (
    <div className="container-side-menu">
      <ul>
        {sideMenuData.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => {
                navigate(item.url);
              }}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SideMenu;
