import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import WorkbookListViewPresenter from "./WorkbookListViewPresenter";
import {useDispatch} from "react-redux";
import {useQuery} from "@tanstack/react-query";
import getQuestionTopView from "queries/workbook/listview/getQuestionTopView";
import useWorkbookData from 'hook/useWorkbookData';
import {WorkbookDataType} from 'components/workbook/type/WorkbookDataType';

function WorkbookListViewContainer(){
    const location = useLocation();
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [currentWorkbookData, setCurrentWorkbookData] = useState<WorkbookDataType[]>([]);
    const [filterActive, setFilterActive] = useState('sortViewed');
    const filterElementClickDispatch = useDispatch();
    const [menuName, setMenuName] = useState('');
    const { isLoading: favIsLoading, isError: favIsError, data: favData, error: favError } = useQuery( [menuName, 'topviews'], () => getQuestionTopView(menuName), {staleTime: 100000});
    const { isLoading: workBookIsLoading, isError: workBookIsError, data: workbookData, error: workBookError } = useWorkbookData(menuName, filterActive, currentPageNumber, currentWorkbookData, setCurrentWorkbookData);

    const filterOnClickHandler = (event: React.MouseEvent) => {
        if(event.currentTarget.id != filterActive){
            setCurrentWorkbookData([]);
            setCurrentPageNumber(0);
        }
        filterElementClickDispatch({type: 'filterClick', activeFilter: event.currentTarget.id})
        setFilterActive(event.currentTarget.id);
    }

    useEffect(() => {
        setMenuName(location.pathname.split('/')[2].toUpperCase());
    }, [location])


    return (
        <WorkbookListViewPresenter 
            menuName={menuName} 
            workbookData={currentWorkbookData} 
            isLastData={workbookData ? workbookData['isLastData'] : false} 
            lastIndex={workbookData ? workbookData['lastIndex'] : 0} 
            favoriteWorkbookData={favData} filterActive={filterActive} 
            filterOnClickHandler={filterOnClickHandler} 
            setCurrentPageNumber={setCurrentPageNumber}
            workBookIsLoading={workBookIsLoading}
            favIsLoading={favIsLoading}
        />
    );
}

export default WorkbookListViewContainer;
