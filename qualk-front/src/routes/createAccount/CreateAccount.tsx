import React, {useState, useEffect} from 'react';
import styles from 'stylesheets/createAccount/CreateAccount.module.css';
import GlobalNavBar from 'components/main/GlobalNavBar';
import {ReactComponent as QualkTitle} from 'assets/images/createAccount/create_account_qualk_title.svg';
import UserInputBox from 'components/login/UserInputBox';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers/reducers';
import TermList from 'components/createAccount/TermList';
import TermModal from 'components/createAccount/TermModal';

function CreateAccount(){
    const [allowed, setAllowed] = useState(true);
    const [idVal, setIdVal] = useState('');
    const [pwVal, setPwVal] = useState('');
    const [pwConfirm, setPwConfirm] = useState('');
    const [idIsValid, setIdIsValid] = useState(false);
    const [pwIsValid, setPwIsValid] = useState(false);
    const [confirmValid, setConfirmValid] = useState(false);
    const navigate = useNavigate();
    const {isOpen: modalIsOpen, title: modalTitle, detail: modalDetail} = useSelector((state: RootState) => state.termModalReducer);

    useEffect(() => {
        isAllowBtn()
    }, [idVal, pwVal, pwConfirm])

    const isAllowBtn = () => {
        if(idIsValid && pwIsValid && confirmValid){
            setAllowed(false);
        } else {
            setAllowed(true)
        }
    }

    const idInputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        
        if(regex.test(event.target.value)){
            setIdIsValid(true);
        } else {
            setIdIsValid(false);
        }
        setIdVal(event.target.value);
    }

    const pwInputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let regex = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        
        if(regex.test(event.target.value)){
            setPwIsValid(true)
        } else {
            setPwIsValid(false);
        }
        setPwVal(event.target.value);
    }

    const pwConfirmOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(pwVal === pwConfirm){
            setConfirmValid(true);
        } else {
            setConfirmValid(false);
        }
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
                <div className={styles.term_container}>
                    <TermList />
                </div>
                <div className={styles.btn_container}>
                    <button disabled={allowed} className={styles.confirm_btn}>가입하기</button>
                </div>
            </div>
            {modalIsOpen ? <TermModal title={modalTitle} detail={modalDetail} /> : null}
        </div>
    )
}

export default CreateAccount;