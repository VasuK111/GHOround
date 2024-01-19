import styles from "./Swap.module.css";
import React, { useEffect, useState } from "react";

import close from "./../../Assets/close.svg";
import { Modal } from "antd";

import { CircularProgress } from "@mui/material";

import { useSDK } from "@metamask/sdk-react";
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
          <div className={styles.modalTitle}>Send</div>
          <div className={styles.modalContent}>
            
            {/* <div  className={styles.swap} >
            <img src={swap} />
            </div> */}
            <div className={styles.modalContentItem}>
             Address
              <input
                className={styles.modalContentItemInput}
                placeholder="0x00000...."
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
              />
            </div>
            <div className={styles.modalContentItem}>
              Amount
              <input
                className={styles.modalContentItemInput}
                placeholder="GHO"
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
                "SWAP"
              )}
            </button>
          </div>
          </div>
        
      </Modal>
    );
  }
  
  const Send = () => {
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
  
  
    return(
        <>
        <button
            className={styles.button}
            onClick={() => setCreateVisible(true)}
          >
            Swap
          </button>
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


  export default Send;
  