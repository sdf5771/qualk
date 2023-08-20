import React, {useState} from 'react';
import styles from './LoginForm.module.css';
import {ReactComponent as QualkTitle} from 'assets/images/login/login_qualk_title.svg';
import UserInputBox from './UserInputBox';
import { useNavigate } from 'react-router-dom';
import SnsBtnElement from './SnsBtnElement';
import kakaoLoginImg from 'assets/images/login/kakao_login.png';
import googleLoginImg from 'assets/images/login/google_login.png';
import useAuth from 'hook/useAuth';
import { useDispatch } from 'react-redux';

function LoginForm(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [idVal, setIdVal] = useState('');
    const [pwVal, setPwVal] = useState('');
    const { defaultLogin, logOut, googleLogin, kakaoLogin } = useAuth();
    const [isValid, setIsValid] = useState(false);

    const idInputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdVal(event.target.value);
    }

    const pwInputOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPwVal(event.target.value);
        
    }

    const loginBtnClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(idVal.replace(" ","") && pwVal.replace(" ","")){
            defaultLogin({email: idVal, password: pwVal});
        } else {
            dispatch({type: 'toast open', toastType: 'warning', toastMsg: '아이디와 비밀번호를 확인해주세요.'})
        }
    }

    return (
        <div className={styles.login_form_root}>
            <div className={styles.user_input_container}>
                <div className={styles.title}>
                    <QualkTitle />
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
                </div>
                <div className={styles.btn_container}>
                    <button onClick={loginBtnClickHandler} className={styles.login}>로그인</button>
                    <button className={styles.remind}>아이디 및 비밀번호 찾기</button>
                </div>
            </div>
            <div className={styles.sns_login_container}>
                <div className={styles.title_container}>
                    <hr />
                    <span>다른 계정으로 로그인</span>
                    <hr />
                </div>
                <div className={styles.sns_element_container}>
                    <SnsBtnElement BtnLogo={googleLoginImg}/>
                    <SnsBtnElement BtnLogo={kakaoLoginImg} />
                </div>
            </div>
            <div className={styles.regist_btn_container}>
                <span>계정이 없으신가요?</span>
                <span onClick={(event: React.MouseEvent<HTMLSpanElement>) => {
                    navigate('/createAccount');
                }}>회원가입</span>
            </div>
        </div>
    )
}

export default LoginForm;