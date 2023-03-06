import React from 'react';
import WorkbookPresenter from "./WorkbookPresenter";
import {useNavigate, useLocation} from "react-router-dom";

function WorkbookContainer(){
    const navigate = useNavigate();
    const location = useLocation();

    console.log('location ', location);

    const headerLogoOnClickHandler = (event:React.MouseEvent) => {
        navigate('/workbook');
    }
    return(
        <WorkbookPresenter headerLogoOnClickHandler={headerLogoOnClickHandler} />
    );
}

export default WorkbookContainer;
