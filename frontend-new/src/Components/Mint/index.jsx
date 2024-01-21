import React, {useState} from "react";
import styles from "./index.module.css";
import gho from "../Navbar/gho.png";
import add from "./plus.png";
import { Modal } from "antd";
import close from "./../../Assets/close.svg";
import { CircularProgress } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Status from "./status2.png";

function Mint(){

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
              <div className={styles.modalTitle}>Be A Facilitator</div>
              <div className={styles.modalContent}>
                <div className={styles.modalContentItem}>
                  <div>Who can be Facilitator?</div>
                  </div>
                <div className={styles.modalContentItem1}>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas repudiandae earum praesentium accusamus excepturi, doloribus dolor totam pariatur ipsum officiis?
                
                </div>
             <div className={styles.modalContentItem}>
                  <div>Required Lendings</div> 
                  <div>10</div>
                  
                </div>
                <div className={styles.modalContentItem}>
                <div>Your Lendings</div> 
                  <div>12</div>
                   
                    </div>
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
                </div> */}
                
                <div className={styles.modalContentItem}>
                  <img style={{height:200, width: 450, marginLeft:0}} src={Status}/>
                </div>
                <div className={styles.modalContentItem}>
                  You are a Facilitator Now!
                </div>
               </div>
              <div className={styles.modalButtonGroup}>
                <button
                  className={styles.modalDepositButton}
                  onClick={() => handleClickDeposit()}
                >START MINTING GHO
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
            <div className={styles.ghocard}>
                <div className={styles.ghoimage}>
                    <img className="photo" src={gho} style={{height:80,width:80}}/>
                </div>
            <div className={styles.mintgho} onClick={() => setCreateVisible(true)}>
                Mint GHO
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
            </div>
        );
}

export default Mint;