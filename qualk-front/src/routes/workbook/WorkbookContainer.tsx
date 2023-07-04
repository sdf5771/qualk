import React,{useEffect} from 'react';
import WorkbookPresenter from "./WorkbookPresenter";
import {useNavigate, useLocation} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "reducers/reducers";

function WorkbookContainer(){
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const workbookModalSelector = useSelector((state: RootState) => state.workbookModalReducer)
    const {isToast, toastType, toastMsg} = useSelector((state: RootState) => state.toastMsgReducer);

    const headerLogoOnClickHandler = (event:React.MouseEvent) => {
        navigate('/');
    }

    // 잘못된 경로로 접속할 경우 임시 redirect
    useEffect(() => {
        if(location.pathname.split('/')[2] != 'gaiq'
            && location.pathname.split('/')[2] != 'GAIQ'
            && location.pathname.split('/')[2] != 'sqld'
            && location.pathname.split('/')[2] != 'SQLD'
            && location.pathname.split('/')[2] != 'sqid'
            && location.pathname.split('/')[2] != 'SQID'
            && location.pathname.split('/')[2] != 'search'
            && location.pathname.split('/')[2] != 'test'
            ){
            navigate('/quiz/gaiq')
        }
    }, [])
    return(
        <WorkbookPresenter
            navigate={navigate}
            dispatch={dispatch}
            location={location}
            headerLogoOnClickHandler={headerLogoOnClickHandler}
            modalState={workbookModalSelector ? workbookModalSelector : {modalStateId: 0}}
            toastType={toastType}
            isToast={isToast}
            toastMsg={toastMsg}
        />
    );
}

export default WorkbookContainer;
