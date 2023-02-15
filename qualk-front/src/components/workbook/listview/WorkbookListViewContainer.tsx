import React, {useState, useEffect} from 'react';
import WorkbookListViewPresenter from "./WorkbookListViewPresenter";
import {useSelector} from "react-redux";
import {RootState} from "reducers/reducers";

function WorkbookListViewContainer(){
    const menuElementActivateSelector = useSelector((state:RootState) => state.menuElementClickReducer);
    const [category, setCategory] = useState(menuElementActivateSelector);
    useEffect(() => {
        setCategory(menuElementActivateSelector);
    }, [menuElementActivateSelector['activeMenuId']])

    return (
        <WorkbookListViewPresenter categoryData={category} />
    );
}

export default WorkbookListViewContainer;
