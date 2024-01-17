import React, {useState, useEffect} from 'react';
import styles from 'stylesheets/createAccount/CreateAccount.module.css';
import GlobalNavBar from 'components/main/GlobalNavBar';
import {ReactComponent as QualkTitle} from 'assets/images/createAccount/create_account_qualk_title.svg';
import UserInputBox from 'components/login/UserInputBox';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers/reducers';
import TermList from 'components/createAccount/TermList';
import TermModal from 'components/createAccount/TermModal';
import ToastMsg from 'components/public/toast-msg/ToastMsg';
import signUp from 'queries/auth/signUp';
import { useMutation } from '@tanstack/react-query';
import { TtermData } from 'javascripts/termData';
import sendAuthMail from 'queries/auth/sendAuthMail';

function CreateAccount(){
    const {isToast, toastType, toastMsg} = useSelector((state: RootState) => state.toastMsgReducer);
    const dispatch = useDispatch();
    const [allowed, setAllowed] = useState(true);
    
    const [idVal, setIdVal] = useState('');
    const [pwVal, setPwVal] = useState('');
    const [pwConfirm, setPwConfirm] = useState('');
    
    const [idIsValid, setIdIsValid] = useState(false);
    const [pwIsValid, setPwIsValid] = useState(false);
    const [confirmValid, setConfirmValid] = useState(false);

    const navigate = useNavigate();
    const {isOpen: modalIsOpen, title: modalTitle, content: modalContent} = useSelector((state: RootState) => state.termModalReducer);
    const termListAgreedSelector = useSelector((state:RootState) => state.termListAgreedReducer);
    const termListDataSelector: TtermData[] = useSelector((state:RootState) => state.termListDataReducer);

    const { mutate: createAccount } = useMutation(signUp);
    const { mutate: sendMail } = useMutation(sendAuthMail);

    const isAllowBtn = () => {
        if(idIsValid && pwIsValid && confirmValid && termListAgreedSelector){
            setAllowed(false);
        } else {
            setAllowed(true)
        }
    }

    useEffect(() => {
        isAllowBtn()
    }, [idIsValid, pwIsValid, confirmValid, termListAgreedSelector])

    const idInputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        
        setIdVal(event.target.value);

        setTimeout(() => {
            if(regex.test(event.target.value)){
                setIdIsValid(true);
            } else {
                setIdIsValid(false);
            }
        }, 100)
    }

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

    const sendSignUpDataClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if(!allowed){
            const agreeTermsData: number[] = []

            termListDataSelector.forEach((data) => {
               agreeTermsData.push(data.isAgree);
           })
           
           createAccount({email: idVal, password: pwVal, agreeTermsData: agreeTermsData}, {
               onSuccess: (data) => {
                   dispatch({type: 'toast open', toastType: 'check', toastMsg: data.message})
                   navigate('/login');
                   sendMail(idVal)
                   dispatch({type: 'sendmail modal open'});
               },
               onError: async ( error ) => {
                   dispatch({type: 'toast open', toastType: 'warning', toastMsg: `${error}`})
               }
           });

        }
    }

    return (
        <div className={styles.create_account_root}>
            <div className={styles.header_container}>
                <GlobalNavBar />
            </div>
            <form className={styles.body_container}>
                <div className={styles.title}>
                    {/* <QualkTitle /> */}
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
                                errorMsg: '이메일 형식에 맞추어주세요.',
                                isError: !idIsValid && idVal !== '',
                            }
                        } />
                    <div>
                        <UserInputBox 
                            type="pw" 
                            title="비밀번호" 
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
                        title="" 
                        inputOption={
                            {
                                placeHolderText:'비밀번호 재확인',
                                onChangeHandler: pwConfirmOnChangeHandler,
                                inputVal: pwConfirm,
                                errorMsg: '비밀번호가 비밀번호 확인 값과 일치하지 않습니다.',
                                isError: !confirmValid && pwConfirm !== '',
                            }
                        } />
                    </div>
                </div>
                <div className={styles.term_container}>
                    <TermList />
                </div>
                <div className={styles.btn_container}>
                    <button onClick={sendSignUpDataClickHandler} disabled={allowed} className={styles.confirm_btn}>가입하기</button>
                </div>
            </form>
            {modalIsOpen ? <TermModal title={modalTitle} content={modalContent} /> : null}
            {isToast && toastMsg && toastType ? <ToastMsg type={toastType} msgText={toastMsg} /> : null}
        </div>
    )
}

export default CreateAccount;