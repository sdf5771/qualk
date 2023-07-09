import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function useRedirect(){
    const navigate = useNavigate();
    const location = useLocation();

    const testList = ['gaiq', 'sqid', 'sqld'];

    const notFoundPageRedirect = () => {
        const locationTarget = location.pathname.split('/')[3];
        
        if(!testList.includes(locationTarget)){
            navigate('/notfound')
        }
    }

    return {notFoundPageRedirect}
}

export default useRedirect;