import React, { useContext } from "react";
import { BeatLoader } from "react-spinners";
import SideMenu from "../../Components/SideMenu/SideMenu";
import { Context } from "../../Context/AuthContext";
import "./styles.css";

function MyWalletPage() {
  const { handleLogout, user } = useContext(Context);

  return (
    <>
      <div className="mywallet-side-menu">
        <SideMenu />
      </div>
      
      <div className="mywallet-container-content">
        {!user ? (
          <BeatLoader size={15} color="white" />
        ) : (
          <>
            <ul>
              {user?.userInfo.coins.map((coin) => {
                return <li key={coin?.id}>{coin?.name}</li>;
              })}
            </ul>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </>
  );
}

export default MyWalletPage;
