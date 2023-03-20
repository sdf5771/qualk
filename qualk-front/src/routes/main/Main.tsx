import React from 'react';
import {useNavigate} from 'react-router-dom';

function Main(){
    const navigate = useNavigate();
    const btnOnClickHandler = (event: React.MouseEvent) => {
        navigate('/workbook');
    }

    return(
        <div>
            <h1>메인 페이지 입니다.</h1>
            <button onClick={btnOnClickHandler}>주소 이동</button>
        </div>
    )
}

export default Main
