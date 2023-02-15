import React from 'react';
import WorkbookPresenter from "./WorkbookPresenter";
import {useNavigate} from "react-router-dom";

function WorkbookContainer(){
    const navigate = useNavigate();
    const headerLogoOnClickHandler = (event:React.MouseEvent) => {
        navigate('/workbook');
    }
    return(
        <WorkbookPresenter headerLogoOnClickHandler={headerLogoOnClickHandler} />
    );
}

export default WorkbookContainer;
