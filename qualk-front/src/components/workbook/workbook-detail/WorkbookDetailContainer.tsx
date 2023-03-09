import React from 'react';
import WorkbookDetailPresenter from "./WorkbookDetailPresenter";
import {useNavigate, useLocation, NavigateFunction, Location} from "react-router-dom";

function WorkbookDetailContainer(){
    const navigate: NavigateFunction = useNavigate();
    const location: Location = useLocation();

    return(
        <WorkbookDetailPresenter navigate={navigate} location={location} />
    )
}

export default WorkbookDetailContainer;
