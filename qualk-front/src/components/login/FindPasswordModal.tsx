import React, {useState} from 'react';
import styles from './FindPasswordModal.module.css';
import {ReactComponent as ModalClose} from 'assets/images/public/modal_close_default.svg';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import changePasswordSendMail from 'queries/auth/changePasswordSendMail';

function FindPasswordModal(){
    const dispatch = useDispatch();
    const [inputVal, setInputVal] = useState('');
    const {mutate, isLoading, isSuccess, isError} = useMutation(changePasswordSendMail,{
        onSuccess(data, variables, context) {
            dispatch({type: 'find password modal close'});
            dispatch({type: 'toast open', toastType: 'check', toastMsg: '이메일 계정의 메일함을 확인해주세요!'})
        },
        onError(){
            dispatch({type: 'toast open', toastType: 'warning', toastMsg: '계정 정보를 확인해주세요.'})
            setInputVal('')
        }
    });

    const okBtnOnClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(inputVal){
            mutate(inputVal);
        } else {
            dispatch({type: 'toast open', toastType: 'warning', toastMsg: '가입하신 계정 정보를 입력해주세요.'})
        }
    }

    const inputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputVal(event.target.value);
    }

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
                    <input onChange={inputOnChangeHandler} type="email" placeholder='가입시 등록한 이메일을 입력해 주세요.' value={inputVal}/>
                </div>
                <div className={styles.btn_container}>
                    <button onClick={okBtnOnClickHandler}>확인</button>
                </div>
            </div>
        </div>
    )
}

export default FindPasswordModal;