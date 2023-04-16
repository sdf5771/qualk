import React, {useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

function NotFound(){
    const location = useLocation();
    const navigate = useNavigate();
    const redirectUrl = () => {
        navigate('/')
    }
    useEffect(() => {
        redirectUrl();
    },[])
    return (
        <></>
    )
}

export default NotFound;
