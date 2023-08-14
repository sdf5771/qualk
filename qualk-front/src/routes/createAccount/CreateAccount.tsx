import React, {useState} from 'react';
import styles from 'stylesheets/createAccount/CreateAccount.module.css';
import GlobalNavBar from 'components/main/GlobalNavBar';
import {ReactComponent as QualkTitle} from 'assets/images/createAccount/create_account_qualk_title.svg';
import UserInputBox from 'components/login/UserInputBox';
import { useNavigate } from 'react-router-dom';

function CreateAccount(){
    const [allowed, setAllowed] = useState(true);
    const [idVal, setIdVal] = useState('');
    const [pwVal, setPwVal] = useState('');
    const [pwConfirm, setPwConfirm] = useState('');
    const navigate = useNavigate();

    const idInputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdVal(event.target.value);
    }

    const pwInputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPwVal(event.target.value);
    }

    const pwConfirmOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPwConfirm(event.target.value);
    }

    return (
        <div className={styles.create_account_root}>
            <div className={styles.header_container}>
                <GlobalNavBar />
            </div>
            <div className={styles.body_container}>
                <div className={styles.title}>
                    <QualkTitle />
                    <h2>회원가입</h2>
                    <div className={styles.login}>
                        <span>이미 계정을 가지고 계시다면 ?</span>
                        <span onClick={() => navigate('/login')}>로그인 하기</span>
                    </div>
                </div>
                <div className={styles.input_form}>
                    <UserInputBox 
                        type="id" 
                        title="아이디" 
                        inputOption={
                            {
                                placeHolderText:'example@gmail.com',
                                onChangeHandler: idInputOnChangeHandler,
                                inputVal: idVal,
                            }
                        } />
                    <div>
                        <UserInputBox 
                            type="pw" 
                            title="비밀번호" 
                            inputOption={
                                {
                                    placeHolderText:'영문, 숫자, 특수 문자 조합 최소 8자 ~ 15자',
                                    onChangeHandler: pwInputOnChangeHandler,
                                    inputVal: pwVal,
                                }
                            } />
                        <UserInputBox 
                        type="pw" 
                        title="" 
                        inputOption={
                            {
                                placeHolderText:'비밀번호 재확인',
                                onChangeHandler: pwConfirmOnChangeHandler,
                                inputVal: pwConfirm,
                            }
                        } />
                    </div>
                </div>
                <div>

                </div>
                <div className={styles.btn_container}>
                    <button disabled={allowed} className={styles.confirm_btn}>가입하기</button>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount;