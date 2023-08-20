import React from 'react';
import styles from './TermModal.module.css';
import { useDispatch } from 'react-redux';
import {ReactComponent as ModalClose} from 'assets/images/public/modal_close_default.svg'

function TermModal({title, detail}: {title: string, detail: string}){
    const dispatch = useDispatch();
    const confirmBtnHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch({type: 'term modal close', title: '', detail: ''})
    }
    return(
        <div className={styles.modal_root}>
            <div>
                <div className={styles.background}></div>
                <div className={styles.modal_box}>
                    <div className={styles.header}>
                        <span>{title}</span>
                        <div onClick={() => dispatch({type: 'term modal close', title: '', detail: ''})}>
                            <ModalClose />
                        </div>
                    </div>
                    <div className={styles.detail_container}>
                        <span>{detail}</span>
                    </div>
                    <div className={styles.btn_container}>
                        <button onClick={confirmBtnHandler} className={styles.confirm_btn}>확인</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TermModal;