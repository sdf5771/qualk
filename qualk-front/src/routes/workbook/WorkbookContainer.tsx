import React from 'react';
import WorkbookPresenter from "./WorkbookPresenter";
import {useNavigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "reducers/reducers";

function WorkbookContainer(){
    const navigate = useNavigate();
    const location = useLocation();
    const shareWorkbookClickSelector = useSelector((state: RootState) => state.shareWorkbookClickReducer)

    const headerLogoOnClickHandler = (event:React.MouseEvent) => {
        navigate('/workbook');
    }
    return(
        <WorkbookPresenter
            location={location}
            headerLogoOnClickHandler={headerLogoOnClickHandler}
            modalState={shareWorkbookClickSelector ? shareWorkbookClickSelector['modalStateId'] : 0}
        />
    );
}

export default WorkbookContainer;
