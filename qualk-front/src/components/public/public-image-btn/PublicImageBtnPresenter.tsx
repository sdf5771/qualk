import React from 'react';
import styles from './PublicImageBtnPresenter.module.css';

function PublicImageBtnPresenter(){
    return(
        <div className={styles.public_btn_root}>
            <div></div>
            <span>목록으로</span>
        </div>
    )
}

export default PublicImageBtnPresenter;
