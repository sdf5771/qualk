import React,{useState} from 'react';
import styles from 'stylesheets/changePassword/ChangePasswordPage.module.css';
import {ReactComponent as QualkTitle} from 'assets/images/createAccount/create_account_qualk_title.svg';
import GlobalNavBar from 'components/main/GlobalNavBar';
import UserInputBox from 'components/login/UserInputBox';

function ChangePasswordPage(){
    const [allowed, setAllowed] = useState(true);
    const [pwVal, setPwVal] = useState('');
    const [pwConfirm, setPwConfirm] = useState('');

    const [pwIsValid, setPwIsValid] = useState(false);
    const [confirmValid, setConfirmValid] = useState(false);

    const pwInputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let regex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/g;

        setPwVal(event.target.value);

        setTimeout(() => {
            if(regex.test(event.target.value)){
                setPwIsValid(true)
            } else {
                setPwIsValid(false);
            }
        }, 100);
    }

    const pwConfirmOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPwConfirm(event.target.value);

        setTimeout(() => {
            if(pwVal === event.target.value){
                setConfirmValid(true);
            } else {
                setConfirmValid(false);
            }
        }, 100)
    }

    const updatePasswordClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(!allowed){

        }
    }

    return(
        <div className={styles.change_password_root}>
            <div className={styles.header_container}>
                <GlobalNavBar />
            </div>
            <form className={styles.body_container}>
                <div className={styles.title}>
                    <QualkTitle />
                    <h2>비밀번호 재설정</h2>
                </div>
                <div className={styles.input_form}>
                        <UserInputBox 
                            type="pw" 
                            title="새 비밀번호" 
                            inputOption={
                                {
                                    placeHolderText:'영문, 숫자, 특수 문자 조합 최소 8자 ~ 15자 (!, @, #, $, %, ^, &, +, =)',
                                    onChangeHandler: pwInputOnChangeHandler,
                                    inputVal: pwVal,
                                    errorMsg: '비밀번호 조합을 확인해주세요.',
                                    isError: !pwIsValid && pwVal !== '',
                                }
                            } />

                        <UserInputBox 
                        type="pw" 
                        title="새 비밀번호 확인" 
                        inputOption={
                            {
                                placeHolderText:'비밀번호를 다시 한번 입력해 주세요.',
                                onChangeHandler: pwConfirmOnChangeHandler,
                                inputVal: pwConfirm,
                                errorMsg: '비밀번호가 비밀번호 확인 값과 일치하지 않습니다.',
                                isError: !confirmValid && pwConfirm !== '',
                            }
                        } />
                </div>
                <div className={styles.btn_container}>
                    <button onClick={updatePasswordClickHandler} disabled={allowed} className={styles.confirm_btn}>변경 완료하기</button>
                </div>
            </form>
        </div>
    )
}

export default ChangePasswordPage;