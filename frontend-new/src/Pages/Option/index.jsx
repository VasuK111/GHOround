import React from "react";
import { useState, useEffect } from "react";
import styles from "./index.module.css";
import { ForceGraph2D } from "react-force-graph";
import { useRef } from "react";
import { Modal } from "antd";
import close from "../../Assets/close.svg";
import { handleFetchGasData } from "../Client/getGasData.js";
import { IoWarningOutline } from "react-icons/io5";
import { CircularProgress } from "@mui/material";
import stakeAbi from "./abi.js";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import gif from "../Home/gif.gif";





const TaskModal = ({ visible, setVisible }) => {
  const navigate = useNavigate();
  const [gasData, setGasData] = useState();
  const [loading, setLoading] = useState(false);

  const handleStaking = async () => {
    setLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const sendAddress = "0xc1490E0489f487477A9B4e52Da19416d21fC09E0";

    try {
      const tx = await signer.sendTransaction({
        to: sendAddress,
        value: ethers.utils.parseEther("0.1"),
        gasPrice: ethers.utils.parseUnits(
          gasData.high.suggestedMaxFeePerGas.slice(0, 5),
          "gwei"
        ),
        gasLimit: 45000,
      });
      await tx.wait();
      toast.success("Deposit successful", {
        style: {
          borderRadius: "8px",
          background: "#16182E",
          color: "#fff",
          padding: "20px 24px",
        },
      });
      navigate("/client");
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
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
        <div className={styles.modalTitle}>Staking</div>
        <div className={styles.modalContent}>
          <div className={styles.modalContentItem}>
            <div className={styles.modalContentItemLabel}>
              <IoWarningOutline size={40} />
              <div>
                In order to participate in the network, you need to stake 0.1
                GHO into the network to ensure it's economic security. Any
                malicious activity will result in slashing of your stake.
              </div>
            </div>
          </div>
          <div className={styles.modalContentItem}>
            <div className={styles.modalContentItemValue}>
              Staking Amount: 0.1 GHO
            </div>
          </div>
          <div className={styles.gasHeader}>Gas Data</div>
          <div className={styles.gasHeader}>Sepolia Testnet</div>
          <div className={styles.modalContentItem}>
            <div className={styles.gasContainer}>
              <div className={styles.modalContentItemLabel}>
                <div>Fastest</div>
                <div>
                  {(gasData &&
                    Math.floor(
                      Number(gasData.high.suggestedMaxFeePerGas.slice(0, 5)) *
                        21592
                    ).toString() + " Gwei") ||
                    0.0 + " Gwei"}
                </div>
              </div>
            </div>
            <div className={styles.modalContentItemLabel}>
              <div>Average</div>
              <div>
                {(gasData &&
                  Math.floor(
                    Number(gasData.medium.suggestedMaxFeePerGas.slice(0, 5)) *
                      21592
                  ).toString() + " Gwei") ||
                  0.0 + " Gwei"}
              </div>
            </div>
            <div className={styles.modalContentItemLabel}>
              <div>Slow</div>
              <div>
                {(gasData &&
                  Math.floor(
                    Number(gasData.low.suggestedMaxFeePerGas.slice(0, 5)) *
                      21592
                  ).toString() + " Gwei") ||
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
            onClick={() => handleStaking()}
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

const Option = () => {
  const [visible, setVisible] = useState(false);
  const fgRef = useRef();
  return (
    <div className={styles.container} styles={{backgroundImage:`url(${gif})`}}>
      <Toaster position="bottom-right" reverseOrder={false} />
     
      <div className={styles.title}>
        <div className={styles.titleDiv}>
          <h1>Get Started with</h1>
          
          <button
            className={styles.actionButton}
            onClick={() => setVisible(true)}
          >
            Lending Models
          </button>
          <a href="/users">
            <button className={styles.actionButton} >Borrowing Models</button>
          </a>
        
        <TaskModal visible={visible} setVisible={setVisible} />
      </div>
      </div>
      </div>
    
  );
};


export default Option;
