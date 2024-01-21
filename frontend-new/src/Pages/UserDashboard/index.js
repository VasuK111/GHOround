import React, {useState, useEffect} from "react";
import styles from "./index.module.css";
import Navbar_b from "../../Components/Borrower/Navbar_b/index";
import ClientTable from "../../Components/ClientTable";
import ClientTableCompleted from "../../Components/ClientTableCompleted";
import close from "./../../Assets/close.svg";
import { Modal } from "antd";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { IoWarningOutline } from "react-icons/io5";
import { handleFetchGasData } from "./getGasData";
import { ethers } from "ethers";
import { abi } from "./abi.js";
import { useSDK } from "@metamask/sdk-react";
import toast, { Toaster } from "react-hot-toast";

import UserTableCompleted from "../../Components/UserTableCompleted";
import Account from "../../Components/Account/Account";
import UserTxHistory from "../../Components/UserTxHistory";
import Card_b from "../../Components/Borrower/Borrowercard/card_b";
import Send from "../../Components/Send/Send";
import Swap from "../../Components/Swap/Swap";




const baseURL = "http://192.168.206.90/api/v1";



const TaskModal = ({
  visible,
  name,
  modelType,
  value,
  clientNumber,
  layerNumber,
  activationFn,
  optimiser,
  setVisible,
  setPayVisible,
  setName,
  setModelType,
  setValue,
  setClientNumber,
  setLayerNumber,
  setActivationFn,
  setOptimiser,
}) => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const { account } = useSDK();

  const handleClickDeposit = async () => {
    setLoading(true);
    setPayVisible(true);
  };


  return (
    <Modal
      visible={visible}
      onOk={() => {}}
      onCancel={() => setVisible(false)}
      footer={null}
      closeIcon={<img src={close} alt="" />}
    >
      <div className={styles.modalContainer}>
        <div className={styles.modalTitle}>Get FIAT</div>
        <div className={styles.modalContent}>
          
          {/* <div  className={styles.swap} >
          <img src={swap} />
          </div> */}
          <div className={styles.modalContentItem}>
            Pay
            <input
              className={styles.modalContentItemInput}
              placeholder="GHO"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
          </div>
          <div className={styles.modalContentItem}>
            Receive
            <input
              className={styles.modalContentItemInput}
              placeholder="EUR"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
        </div>
        <div className={styles.modalButtonGroup}>
          <button
            className={styles.modalDepositButton}
            onClick={() => handleClickDeposit()}
          >
            {loading ? (
              <CircularProgress
                size={20}
                sx={{
                  color: "#fff",
                }}
              />
            ) : (
              "GET"
            )}
          </button>
        </div>
        </div>
      
    </Modal>
  );
}



const UserDashboard = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [createVisible, setCreateVisible] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [name, setName] = useState("");
  const [modelType, setModelType] = useState("");
  const [value, setValue] = useState("");
  const [clientNumber, setClientNumber] = useState(3);
  const [layerNumber, setLayerNumber] = useState(2);
  const [activationFn, setActivationFn] = useState("");
  const [optimiser, setOptimiser] = useState("");

  const handleTabChange = (index) => {
    setActiveTab(index);
  };
  
  return (
    <>
      <Navbar_b />
      <div className={styles.container}>
        <h1 className={styles.borrowings}>My Borrowings</h1>
        <div className={styles.tabs}>
          
          <div
            className={activeTab === 0 ? styles.tabActive : styles.tab}
            onClick={() => handleTabChange(0)}
          >
            Borrowed Models
          </div>
         <Send/>
         <Swap/>
          <div
            className={activeTab === 1 ? styles.tabActive : styles.tab}
            onClick={() => handleTabChange(1)}
          >
            Sell P2P 
          </div>
          <div
            className={activeTab === 2 ? styles.tabActive : styles.tab}
            onClick={() => handleTabChange(2)}
          >
            Buy P2P 
          </div>
          <button
            className={styles.button}
            onClick={() => setCreateVisible(true)}
          >
            Get Fiat
          </button>
          <div
            className={activeTab === 3 ? styles.tabActive : styles.tab}
            onClick={() => handleTabChange(3)}
          >
            My Account
          </div>
        </div>
        {activeTab === 0 ? (
          <Card_b />
        ) : activeTab === 1 ? (
          <UserTableCompleted />
        ) : activeTab===2 ? (
          <UserTxHistory />
        ) : activeTab ===3 ? (
          <Account />
        ): (
          <>Error occured</>
        )
      }
      </div>
      
      <TaskModal
        visible={createVisible}
        name={name}
        modelType={modelType}
        value={value}
        clientNumber={clientNumber}
        layerNumber={layerNumber}
        activationFn={activationFn}
        optimiser={optimiser}
        setVisible={setCreateVisible}
        setPayVisible={setVisible}
        setName={setName}
        setModelType={setModelType}
        setValue={setValue}
        setClientNumber={setClientNumber}
        setLayerNumber={setLayerNumber}
        setActivationFn={setActivationFn}
        setOptimiser={setOptimiser}
      />
    
    </>
  );
};


export default UserDashboard;
