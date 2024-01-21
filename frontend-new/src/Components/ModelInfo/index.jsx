import React, {useState} from "react";
import styles from "./index.module.css";
import { Modal } from "antd";
import close from "./../../Assets/close.svg";
import { CircularProgress } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Router from "../Lender/Router/index";

function ModelInfo(){


    const TaskModal2 = ({
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
              <div className={styles.modalTitle}>Heikenashi</div>
              <div className={styles.modalContent}>
                <div className={styles.modalContentItem}>
                  Model Name
                  <input
                    className={styles.modalContentItemInput}
                    placeholder=""
                    onChange={(e) => setName(e.target.value)}
                  />
                  
                </div>
                
               <div className={styles.modalContentItem}>
                  No. of Clients
                  <input
                    className={styles.modalContentItemInput}
                    placeholder=""
                    value={clientNumber}
                    onChange={(e) => setClientNumber(Number(e.target.value))}
                  />
                  
                </div>
                <div className={styles.modalContentItem}>
                  No. of Layers
                  <input
                    className={styles.modalContentItemInput}
                    placeholder=""
                    value={layerNumber}
                    onChange={(e) => setLayerNumber(Number(e.target.value))}
                  />
                   
                    </div>
                </div>  
                
                
                <div className={styles.modalContentItem}>
                  Interest Rate
                 
               
                </div>
                
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
    <div >
    <TaskModal2
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

export default ModelInfo;