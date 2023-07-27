import React from 'react';
import styles from 'stylesheets/admin/AdminPage.module.css';
import Navbar from 'components/admin/navbar/Navbar';

function AdminPage(){
    return(
        <div className={styles.root}>
            <Navbar />
            <div className={styles.page_body}>

            </div>
        </div>
    )
}

export default AdminPage;