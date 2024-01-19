import React from "react";
import styles from "./index.module.css";
import Navbar from "../../Components/Navbar";
import ClientTable from "../../Components/ClientTable";
import ClientTableCompleted from "../../Components/ClientTableCompleted";
import { Toaster } from "react-hot-toast";

const baseURL = "http://192.168.206.90/api/v1";


const UserDashboard = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [createVisible, setCreateVisible] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.user_dashboard}>My Borrowings</h1>
        <div className={styles.tabs}>
          <button
            className={styles.button}
            onClick={() => setCreateVisible(true)}
          >
            Add Model
          </button>
          <div
            className={activeTab === 0 ? styles.tabActive : styles.tab}
            onClick={() => handleTabChange(0)}
          >
            Buy P2P
          </div>
          <div
            className={activeTab === 1 ? styles.tabActive : styles.tab}
            onClick={() => handleTabChange(1)}
          >
            Sell P2P 
          </div>
          <div
            className={activeTab === 1 ? styles.tabActive : styles.tab}
            onClick={() => handleTabChange(2)}
          >
            Get FIAT
          </div>
          <div
            className={activeTab === 1 ? styles.tabActive : styles.tab}
            onClick={() => handleTabChange(3)}
          >
            My Account
          </div>
        </div>
        {activeTab === 0 ? <ClientTable /> : <ClientTableCompleted />}
      </div>
    </>
  );
};

export default UserDashboard;
