import React, {useState} from 'react';
import {Cookies} from 'react-cookie';
import { useMutation } from '@tanstack/react-query';
import getUserAuth from 'queries/auth/getUserAuth';

const cookies = new Cookies();

function useAuth(){
    const [accessToken, setAccessToken] = useState('');
    const getCookie = (name: string) => cookies.get(name);
    const setCookie = (name: string, value: string, options?: any) => cookies.set(name, value, {...options});
    const { mutate: getUserAuthData } = useMutation(getUserAuth);

    

    const defaultLogin = ({email, password}: {email: string, password: string}) => {
        return getUserAuthData({email, password});
    }

    const logOut = () => {
        
    }

    const googleLogin = () => {

    }

    const kakaoLogin = () => {

    }
}

export default useAuth;