import React,{useRef} from 'react';
import WorkbookPresenter from "./WorkbookPresenter";
import {useNavigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "reducers/reducers";

function WorkbookContainer(){
    const navigate = useNavigate();
    const location = useLocation();
    const shareWorkbookClickSelector = useSelector((state: RootState) => state.shareWorkbookClickReducer)
    const {isToast, toastMsg} = useSelector((state: RootState) => state.toastMsgReducer);
    console.log('isToast ', isToast);
    console.log('toastMsg ', toastMsg);
    const headerLogoOnClickHandler = (event:React.MouseEvent) => {
        navigate('/');
    }
    return(
        <WorkbookPresenter
            location={location}
            headerLogoOnClickHandler={headerLogoOnClickHandler}
            modalState={shareWorkbookClickSelector ? shareWorkbookClickSelector['modalStateId'] : 0}
            isToast={isToast}
            toastMsg={toastMsg}
        />
    );
}

export default WorkbookContainer;
