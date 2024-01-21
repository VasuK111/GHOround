import react from 'react';
import styles from "./Account.module.css";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import PaymentIcon from '@mui/icons-material/Payment';

const Account = ()=>{
    

return(
    <div className={styles.account}>
        <div className={styles.button}>
        <div><PersonOutlineIcon  className={styles.icon}/></div>
        <div className={styles.options}>My Profile</div>
        </div>
        <div className={styles.button}> <div><HistoryIcon  className={styles.icon}/></div>
        <div className={styles.options}>Payment History</div>
        </div>
        <div className={styles.button}> <div><PaymentIcon className={styles.icon}/></div>
        <div className={styles.options}>Charges Due</div>
        </div>
        <div className={styles.button}> <div><SettingsIcon  className={styles.icon}/></div>
        <div className={styles.options}>Settings</div>
        </div>
    </div>
)
}

export default Account;