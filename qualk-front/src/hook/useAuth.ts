import React, {useState} from 'react';
import {Cookies} from 'react-cookie';
import { useMutation } from '@tanstack/react-query';
import signUp from 'queries/auth/signUp';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const cookies = new Cookies();

function useAuth(){
    const ACCESSTOKEN_KEY = 'accessToken';
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getCookie = (name: string) => cookies.get(name);
    const setCookie = (name: string, value: string, options?: any) => cookies.set(name, value, {...options});
    
    const { mutate: getUserAuthData } = useMutation(signUp, {
        onSuccess: (data) => {
            let {accessToken} = data

            localStorage.setItem('accessToken', accessToken);
            dispatch({type: 'toast open', toastType: 'check', toastMsg: '로그인에 성공했어요.'})

            navigate('/');
        },
        onError: (e) => {
            console.log(e);
            dispatch({type: 'toast open', toastType: 'warning', toastMsg: '로그인에 실패했어요. 아이디와 비밀번호를 확인해주세요.'})
        },
    });

    const getAccessToken = () => {
        return localStorage.getItem(ACCESSTOKEN_KEY);
    }

    const defaultLogin = ({email, password}: {email: string, password: string}) => {
        return getUserAuthData({email, password});
    }

    const logOut = () => {
        localStorage.removeItem(ACCESSTOKEN_KEY)
        navigate('/login')
    }

    const googleLogin = () => {

    }

    const kakaoLogin = () => {

    }

    return {
        getAccessToken,
        defaultLogin,
        logOut,
        googleLogin,
        kakaoLogin,
    }
}

export default useAuth;