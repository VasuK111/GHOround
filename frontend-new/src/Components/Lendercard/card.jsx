import React, { useEffect, useState } from "react";
import styles from "./card.module.css";
import add from "./plus.png";
import { Modal } from "antd";
import close from "./../../Assets/close.svg";
import { CircularProgress } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Card(){

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
              <div className={styles.modalTitle}>Add new model</div>
              <div className={styles.modalContent}>
                <div className={styles.modalContentItem}>
                  Model Name
                  <input
                    className={styles.modalContentItemInput}
                    placeholder=""
                    onChange={(e) => setName(e.target.value)}
                  />
                  {/* <img src={UsdcLogo} alt="" /> */}
                </div>
                <div className={styles.modalContentItem}>
                  Model Type
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
                  </FormControl>
                </div>
                {/* <div className={styles.modalContentItem}>
                  No. of Clients
                  <input
                    className={styles.modalContentItemInput}
                    placeholder=""
                    value={clientNumber}
                    onChange={(e) => setClientNumber(Number(e.target.value))}
                  />
                  {/* <img src={UsdcLogo} alt="" /> */}
                {/*</div>
                <div className={styles.modalContentItem}>
                  No. of Layers
                  <input
                    className={styles.modalContentItemInput}
                    placeholder=""
                    value={layerNumber}
                    onChange={(e) => setLayerNumber(Number(e.target.value))}
                  />
                  {/* <img src={UsdcLogo} alt="" /> */}
                </div>  
                <div className={styles.modalContentItem}>
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
                </div>
                <div className={styles.modalContentItem}>
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
                </div>
                <div className={styles.modalContentItem}>
                  Interest Rate
                  <input
                    className={styles.modalContentItemInput}
                    placeholder="in %"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                  />
                  {/* <img src={UsdcLogo} alt="" /> */}
                </div>
                <input className={styles.modalInputFile} type="file" />
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
                    "ADD"
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
  const [clientNumber, setClientNumber] = useState(3);
  const [layerNumber, setLayerNumber] = useState(2);
  const [activationFn, setActivationFn] = useState("");
  const [optimiser, setOptimiser] = useState("");

  
      
    return(
    <div className={styles.cards}>
        <span>
    <div className={styles.card}>
        <h1 className={styles.cardTitle}>Heikenashi</h1>
        <p className={styles.cardSubtitle}>This is a simple card.</p>
        <button className={styles.button}>Details</button>
    </div>
    </span>
    <span>
    <div className={styles.card}>
        <h1 className={styles.cardTitle}>Heikenashi</h1>
        <p className={styles.cardSubtitle}>This is a simple card.</p>
        <button className={styles.button}>Details</button>
    </div>
    </span>
    <span>
        <div>
            <img className={styles.add} onClick={() => setCreateVisible(true)} src={add}/>
            
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
    </span>
    </div>
    );
}
export default Card;