import React from 'react';
import styles from './FindPasswordModal.module.css';
import {ReactComponent as ModalClose} from 'assets/images/public/modal_close_default.svg';
import { useDispatch } from 'react-redux';

function FindPasswordModal(){
    const dispatch = useDispatch();
    return(
        <div className={styles.find_password_root}>
            <div className={styles.bg_container}></div>
            <div className={styles.modal_body}>
                <div className={styles.header_container}>
                    <span>비밀번호 재설정하기</span>
                    <div onClick={() => {
                        dispatch({type: 'find password modal close'});
                    }}>
                        <ModalClose />
                    </div>
                </div>
                <div className={styles.description_container}>
                    <span>이메일로 비밀번호 재설정 링크를 보내드려요.</span>
                </div>
                <div className={styles.input_container}>
                    <input type="email" placeholder='가입시 등록한 이메일을 입력해 주세요.'/>
                </div>
                <div className={styles.btn_container}>
                    <button>확인</button>
                </div>
            </div>
        </div>
    )
}

export default FindPasswordModal;