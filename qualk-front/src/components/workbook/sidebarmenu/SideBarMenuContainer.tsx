import React from 'react';
import SideBarPresenter from "./SideBarMenuPresenter";
import {useDispatch} from "react-redux";

function SideBarContainer(){
    const dispatch = useDispatch();
    const bannerOnClickHandler = (event: React.MouseEvent) => {

    }
    return(
        <SideBarPresenter bannerOnClickHandler={bannerOnClickHandler} />
    );
}

export default SideBarContainer;
