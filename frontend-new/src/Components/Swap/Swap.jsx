import styles from "./Swap.module.css";
import React, { useEffect, useState } from "react";
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
    chain1,
    chain2,
    optimiser,
    setVisible,
    setPayVisible,
    setName,
    setModelType,
    setValue,
    setClientNumber,
    setLayerNumber,
    setActivationFn,
    setChain1,
    setChain2,
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
                
            <div className={styles.modalContentItem}>From
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={chain1}
                defaultValue={"ETHEREUM"}
                onChange={(e) => setChain1(e.target.value)}
                sx={{
                  color: "#fff",
                  fontFamily: "Inter-Tight",
                  fontWeight: 500,
                  fontSize: 20,
                }}
              >
                <MenuItem value={"Ethereum"}>GHO</MenuItem>
                <MenuItem value={"Polygon"}>MATIC</MenuItem>
                <MenuItem value={"Arbitrum"}>ARB</MenuItem>
              </Select>
            </FormControl>
          </div><div>
          <SwapVertIcon color="secondary"  className={styles.swap} sx={{fontSize:40}}/></div>
          <div className={styles.modalContentItem}>To
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={chain2}
                defaultValue={"POLYGON"}
                onChange={(e) => setChain2(e.target.value)}
                sx={{
                  color: "#fff",
                  fontFamily: "Inter-Tight",
                  fontWeight: 500,
                  fontSize: 20,
                }}
              >
                
                <MenuItem value={"Polygon"}>MATIC</MenuItem>
                <MenuItem value={"Arbitrum"}>ARB</MenuItem>
                <MenuItem value={"Ethereum"}>ETH</MenuItem>
              </Select>
            </FormControl>
          </div>
            
          <div>
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
    const [chain1, setChain1] = useState("");
    const [chain2, setChain2] = useState("");
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
        chain1={chain1}
        chain2={chain2}
        optimiser={optimiser}
        setVisible={setCreateVisible}
        setPayVisible={setVisible}
        setName={setName}
        setModelType={setModelType}
        setValue={setValue}
        setClientNumber={setClientNumber}
        setLayerNumber={setLayerNumber}
        setActivationFn={setActivationFn}
        setChain1={setChain1}
        setChain2={setChain2}
        setOptimiser={setOptimiser}
        
      />
      </>
    );
    };


  export default Send;
  