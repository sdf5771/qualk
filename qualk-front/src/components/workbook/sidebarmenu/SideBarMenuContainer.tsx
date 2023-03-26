import React from 'react';
import SideBarPresenter from "./SideBarMenuPresenter";
import {useDispatch} from "react-redux";

function SideBarContainer(){
    const dispatch = useDispatch();
    const bannerOnClickHandler = (event: React.MouseEvent) => {
        dispatch({type: 'toast open', toastMsg: '아직 준비중인 기능이에요.'})
    }
    return(
        <SideBarPresenter bannerOnClickHandler={bannerOnClickHandler} />
    );
}

export default SideBarContainer;
