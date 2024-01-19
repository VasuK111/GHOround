import react from 'react';
import styles from "./Account.module.css";

const Account = ()=>{
    

return(
    <div>
        <div className={styles.button}>
            Payment History
        </div>
        <div className={styles.button}>
            Charges Due
        </div>
        <div className={styles.button}>
            Settings
        </div>
    </div>
)
}

export default Account;