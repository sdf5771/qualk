import React from 'react';
import styles from './TermModal.module.css';
import { useDispatch } from 'react-redux';
import {ReactComponent as ModalClose} from 'assets/images/public/modal_close_default.svg'

function TermModal({title, content}: {title: string, content: string}){
    const dispatch = useDispatch();
    const confirmBtnHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch({type: 'term modal close', title: '', content: ''})
    }
    return(
        <div className={styles.modal_root}>
            <div>
                <div className={styles.background}></div>
                <div className={styles.modal_box}>
                    <div className={styles.header}>
                        <span>{title}</span>
                        <div onClick={() => dispatch({type: 'term modal close', title: '', content: ''})}>
                            <ModalClose />
                        </div>
                    </div>
                    <div className={styles.detail_container}>
                        <span>{content}</span>
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