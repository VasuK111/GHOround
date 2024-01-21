import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Modal } from "antd";
import close from "./../../../Assets/close.svg";
import { CircularProgress } from "@mui/material";

function Router (){

    const TaskModal = ({
        visible,
        name,
        modelType,
        value,
        chainNumber,
        address,
        activationFn,
        optimiser,
        setVisible,
        setPayVisible,
        setName,
        setModelType,
        setValue,
        setChainNumber,
        setAddress,
        setActivationFn,
        setOptimiser,
      }) => {
        const [loading, setLoading] = useState(false);
        
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
              <div className={styles.modalTitle}>Lending Details</div>
              <div className={styles.modalContent}>
                <div className={styles.modalContentItem}>
                  Router Address
                  <input
                    className={styles.modalContentItemInput}
                    placeholder=""
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {/* <div className={styles.modalContentItem}>
                  Destination Chain
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={modelType}
                      onChange={(e) => setModelType(e.target.value)}
                      sx={{
                        color: "#fff",
                        fontFamily: "Inter-Tight",
                        fontWeight: 500,
                        fontSize: 20,
                      }}
                    >
                      <MenuItem value={"CNN"}>CNN</MenuItem>
                      <MenuItem value={"RNN"}>RNN</MenuItem>
                      <MenuItem value={"MLP"}>MLP</MenuItem>
                    </Select>
                  </FormControl> */}
                </div>
                <div className={styles.modalContentItem}>
                  Destination Chain
                  <input
                    className={styles.modalContentItemInput}
                    placeholder=""
                    value={chainNumber}
                    onChange={(e) => setChainNumber(Number(e.target.value))}
                  />
                 
                </div>
                <div className={styles.modalContentItem}>
                  Address
                  <input
                    className={styles.modalContentItemInput}
                    placeholder=""
                    value={address}
                    onChange={(e) => setAddress(Number(e.target.value))}
                  />
                </div>  
                {/* <div className={styles.modalContentItem}>
                  Base Fees
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={activationFn}
                      onChange={(e) => setActivationFn(e.target.value)}
                      sx={{
                        color: "#fff",
                        fontFamily: "Inter-Tight",
                        fontWeight: 500,
                        fontSize: 20,
                      }}
                    >
                      <MenuItem value={"1 GHO"}>1 GHO</MenuItem>
                      <MenuItem value={"2 GHO"}>2 GHO</MenuItem>
                      <MenuItem value={"3 GHO"}>3 GHO</MenuItem>
                    </Select>
                  </FormControl>
                </div> */}
                {/* <div className={styles.modalContentItem}>
                  Time Period
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={optimiser}
                      onChange={(e) => setOptimiser(e.target.value)}
                      sx={{
                        color: "#fff",
                        fontFamily: "Inter-Tight",
                        fontWeight: 500,
                        fontSize: 20,
                      }}
                    >
                      <MenuItem value={"1 month"}>1 month</MenuItem>
                      <MenuItem value={"2 month"}>2 month</MenuItem>
                      <MenuItem value={"3 month"}>3 month</MenuItem>
                    </Select>
                  </FormControl>
                </div> */}
                <div className={styles.modalContentItem}>
                  Fees
                  <input
                    className={styles.modalContentItemInput}
                    placeholder="GHO"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                  />
               
                </div>
                <div className={styles.modalContentItem}>
                  CID
                  <input
                    className={styles.modalContentItemInput}
                    placeholder="GHO"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
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
                    "LEND"
                  )}
                </button>
              </div>
            
          </Modal>
        );
      }


  const [createVisible, setCreateVisible] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [name, setName] = useState("");
  const [modelType, setModelType] = useState("");
  const [value, setValue] = useState("");
  const [chainNumber, setChainNumber] = useState("");
  const [address, setAddress] = useState("");
  const [activationFn, setActivationFn] = useState("");
  const [optimiser, setOptimiser] = useState("");

  return(
    <>
        <button
            className={styles.button}
            onClick={() => setCreateVisible(true)}
          >NEXT
          </button>
          <TaskModal
        visible={createVisible}
        name={name}
        modelType={modelType}
        value={value}
        chainNumber={chainNumber}
        adress={address}
        activationFn={activationFn}
        optimiser={optimiser}
        setVisible={setCreateVisible}
        setPayVisible={setVisible}
        setName={setName}
        setModelType={setModelType}
        setValue={setValue}
        setChainNumber={setChainNumber}
        setAddress={setAddress}
        setActivationFn={setActivationFn}
        setOptimiser={setOptimiser}
      />
      </>
  );

}

export default Router;