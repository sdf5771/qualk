import React from 'react';
import styles from 'stylesheets/createAccount/CreateAccount.module.css';
import GlobalNavBar from 'components/main/GlobalNavBar';

function CreateAccount(){
    return (
        <div className={styles.create_account_root}>
            <div className={styles.header_container}>
                <GlobalNavBar />
            </div>
            <div className={styles.body_container}>

            </div>
        </div>
    )
}

export default CreateAccount;