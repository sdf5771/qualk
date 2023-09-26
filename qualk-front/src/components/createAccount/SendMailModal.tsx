import React from 'react';
import styles from './SendMailModal.module.css';
import {ReactComponent as SendMailDuck} from 'assets/images/createAccount/send_mail_duck.svg';
import { useDispatch } from 'react-redux';
function SendMailModal(){
    const dispatch = useDispatch();
    
    return(
        <div className={styles.send_mail_modal_root}>
            <div>
                <div className={styles.background}></div>
                <div className={styles.modal_container}>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '280px', height: '240px'}}>
                        <SendMailDuck />
                    </div>
                    <div className={styles.description_container}>
                        <span>앞으로 함께할 여정이 기대돼요!</span>
                        <span>회원가입이 완료되었어요! 입력하신 이메일 주소로 <br></br> 인증 메일을 발송했어요! 이메일을 확인해 볼까요?</span>
                    </div>
                    <div>
                        <button onClick={() => {dispatch({type: 'sendmail modal close'})}} className={styles.btn}>확인</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendMailModal;