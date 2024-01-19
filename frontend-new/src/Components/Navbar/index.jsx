import React from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import BlockiesSvg from "blockies-react-svg";
import { useSDK } from "@metamask/sdk-react";
import gif from "./gif.gif";

const Navbar = () => {
  const { account } = useSDK();
  const pathName = window.location.pathname;
  const role = pathName === "/users" ? "User" : "Client"


  return (
    <div className={styles.navbar} >
      <div className={styles.navListLeft} styles={{backgroundImage:`url(${gif})`}}>
        <div className={styles.navItem}>
          <Link to="/">Home</Link>
        </div>
      </div>
      <div className={styles.navListRight}>
        <div className={styles.wallet}>
          <BlockiesSvg
            address={account || "0x000000"}
            style={{
              width: 35,
              height: 40,
              borderRadius: 20,
              marginRight: 8
            }}
          />
          <div className={styles.details}>
            <div className={styles.walletAddress}>
              {account && `${account.slice(0, 6)}...${account.slice(-5, -1)}`}
            </div> 
              <div className={styles.walletRole}>{role}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
