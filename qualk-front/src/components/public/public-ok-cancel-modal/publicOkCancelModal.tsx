import React from 'react';
import styles from 'components/public/public-ok-cancel-modal/publicOkCancelModal.module.css';
import {ReactComponent as CloseBtn} from 'assets/images/public/ok_cancel_modal_close.svg';

type TpublicOkCancelModalProps = {
    title: string;
    description: string;
    okBtnTitle: string;
    cancelbtnTitle: string;
    okBtnClickEventHandler: React.MouseEventHandler,
    cancelBtnClickEventHandler: React.MouseEventHandler,
    closeBtnClickEventHandler: React.MouseEventHandler,
    option? : {
        okBtnColor?: 'default' | 'yellow',
        cancelBtnColor?: 'default' | 'yellow',
    }
}

function publicOkCancelModal({title, description, okBtnTitle, cancelbtnTitle, okBtnClickEventHandler, cancelBtnClickEventHandler, closeBtnClickEventHandler, option}: TpublicOkCancelModalProps){
    return(
        <div className={styles.public_ok_cancel_root}>
            <div className={styles.background}></div>
            <div className={styles.modal_root}>
                <div className={styles.header}>
                    <span>{title}</span>
                    <div style={{cursor: 'pointer'}} onClick={closeBtnClickEventHandler}><CloseBtn /></div>
                </div>
                <div className={styles.description_conatiner}>
                    <span>{description}</span>
                </div>
                <div className={styles.btn_container}>
                    <button 
                        onClick={okBtnClickEventHandler} 
                        className={`${styles.modal_btn} ${option && option.okBtnColor ? styles[`${option.okBtnColor}`] : 'default'}`}>{okBtnTitle}</button>
                    <button 
                        onClick={cancelBtnClickEventHandler} 
                        className={`${styles.modal_btn} ${option && option.cancelBtnColor ? styles[`${option.cancelBtnColor}`] : 'default'}`}>{cancelbtnTitle}</button>
                </div>
            </div>
        </div>
    )
}

export default publicOkCancelModal;