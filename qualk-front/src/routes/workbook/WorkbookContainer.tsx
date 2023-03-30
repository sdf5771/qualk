import React,{useRef} from 'react';
import WorkbookPresenter from "./WorkbookPresenter";
import {useNavigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "reducers/reducers";

function WorkbookContainer(){
    const navigate = useNavigate();
    const location = useLocation();
    const shareWorkbookClickSelector = useSelector((state: RootState) => state.shareWorkbookClickReducer)
    const {isToast, toastType, toastMsg} = useSelector((state: RootState) => state.toastMsgReducer);

    const headerLogoOnClickHandler = (event:React.MouseEvent) => {
        navigate('/');
    }
    return(
        <WorkbookPresenter
            location={location}
            headerLogoOnClickHandler={headerLogoOnClickHandler}
            modalState={shareWorkbookClickSelector ? shareWorkbookClickSelector['modalStateId'] : 0}
            toastType={toastType}
            isToast={isToast}
            toastMsg={toastMsg}
        />
    );
}

export default WorkbookContainer;
