import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Navbar from "../../Components/Navbar";
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
import { abi } from "./abi";
import { useSDK } from "@metamask/sdk-react";
import toast, { Toaster } from "react-hot-toast";

import UserTableCompleted from "../../Components/UserTableCompleted";
import Account from "../../Components/Account/Account";
import UserTxHistory from "../../Components/UserTxHistory";
import Card from "../../Components/Lender/Lendercard/card";
import Send from "../../Components/Send/Send";
import Swap from "../../Components/Swap/Swap";

const baseURL = "http://192.168.206.90/api/v1";


const TxModal = ({
  visible,
  setVisible,
  setCreateVisible,
  name,
  modelType,
  clientNumber,
  layerNumber,
  activationFn,
  optimiser,
  value,
}) => {
  const [loading, setLoading] = useState(false);
  const [gasData, setGasData] = useState();
  const { account } = useSDK();

  const handleClickDeposit = async () => {
    setLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x6a1b1d831d2e1605e25ad83ef0e852c6c4f1c2e8",
      abi,
      signer
    );
    const tx = await contract.payBaseFee({
      value: ethers.utils.parseEther("0.05"),
    });
    await tx.wait();
    await axios
      .post(`${baseURL}/form/add`, {
        User_Address: account,
        session_name: name,
        model_type: modelType,
        no_of_clients: clientNumber,
        no_of_layers: layerNumber,
        activation_function: activationFn,
        Optimizer: optimiser,
        Desired_Accuracy: value,
        display: "0",
      })
      .then((response) => {
        toast.success("Session created successfully", {
          style: {
            borderRadius: "8px",
            background: "#16182E",
            color: "#fff",
            padding: "20px 24px",
          },
        });
        console.log(response);
      });
    setLoading(false);
    setVisible(false);
    setCreateVisible(false);
  };

  useEffect(() => {
    (async () => {
      const gasData = await handleFetchGasData();
      setGasData(gasData);
    })();
  }, []);

  return (
    <Modal
      visible={visible}
      onOk={() => {}}
      onCancel={() => setVisible(false)}
      footer={null}
      closeIcon={<img src={close} alt="" />}
    >
      <div className={styles.modalContainer}>
        <div className={styles.modalTitle}>Payment</div>
        <div className={styles.modalContent}>
          <div className={styles.modalContentItem}>
            <div className={styles.modalContentItemLabel}>
              <IoWarningOutline size={40} />
              <div>
                You need to pay a base fees for training your model. You will be
                charged an additional fees of 0.1GHO per epoch. You will be
                charged a gas fee for the transaction.
              </div>
            </div>
          </div>
          <div className={styles.modalContentItem}>
            <div className={styles.modalContentItemValue}>
              Base Fees: 0.05 GHO
            </div>
            <div>Protocol Fees: 0.0002GHO</div>
          </div>
          <div className={styles.gasHeader}>Gas Data</div>
          <div className={styles.gasHeader}>GHO</div>
          <div className={styles.modalContentItem}>
            <div className={styles.gasContainer}>
              <div className={styles.modalContentItemLabel}>
                <div>Fastest</div>
                <div>
                  {(gasData &&
                    gasData.high.suggestedMaxFeePerGas.slice(0, 5) + " Gwei") ||
                    0.0 + " Gwei"}
                </div>
              </div>
            </div>
            <div className={styles.modalContentItemLabel}>
              <div>Average</div>
              <div>
                {(gasData &&
                  gasData.medium.suggestedMaxFeePerGas.slice(0, 5) + " Gwei") ||
                  0.0 + " Gwei"}
              </div>
            </div>
            <div className={styles.modalContentItemLabel}>
              <div>Slow</div>
              <div>
                {(gasData &&
                  gasData.low.suggestedMaxFeePerGas.slice(0, 5) + " Gwei") ||
                  0.0 + " Gwei"}
              </div>
            </div>
            <div></div>
          </div>
          <div className={styles.congestion}>
            Network Congestion: {gasData && gasData.networkCongestion}
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
              "Pay Now"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

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
      <Navbar />
      <div className={styles.container}>
        <h1>My Lendings</h1>
        <div className={styles.tabs}>
          
          <div
            className={activeTab === 0 ? styles.tabActive : styles.tab}
            onClick={() => handleTabChange(0)}
          >
            Lended Models
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
          <Card />
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
      <TxModal
        visible={visible}
        name={name}
        modelType={modelType}
        value={value}
        clientNumber={clientNumber}
        layerNumber={layerNumber}
        activationFn={activationFn}
        optimiser={optimiser}
        setVisible={setVisible}
        setCreateVisible={setCreateVisible}
      />
    </>
  );
};

export default UserDashboard;
