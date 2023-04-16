import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import WorkbookListViewPresenter from "./WorkbookListViewPresenter";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "reducers/reducers";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import getQuestionTopView from "queries/workbook/listview/getQuestionTopView";
import useWorkbookData from 'hook/useWorkbookData';
import {WorkbookDataType} from 'components/workbook/type/WorkbookDataType';

function WorkbookListViewContainer(){
    const navigate = useNavigate();
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [currentWorkbookData, setCurrentWorkbookData] = useState<WorkbookDataType[]>([]);
    const [filterActive, setFilterActive] = useState('sortViewed');
    const menuElementActivateSelector = useSelector((state:RootState) => state.childMenuClickReducer);
    const filterElementActivateSelector = useSelector((state:RootState) => state.filterClickReducer);
    const filterElementClickDispatch = useDispatch();
    const [category, setCategory] = useState(menuElementActivateSelector);
    const { isLoading: favIsLoading, isError: favIsError, data: favData, error: favError } = useQuery( [category['activeMenu'], 'topviews'], () => getQuestionTopView(category['activeMenu']), {staleTime: 100000});
    const { isLoading: workBookIsLoading, isError: workBookIsError, data: workbookData, error: workBookError } = useWorkbookData(category['activeMenu'], filterActive, currentPageNumber, currentWorkbookData, setCurrentWorkbookData);

    const filterOnClickHandler = (event: React.MouseEvent) => {
        if(event.currentTarget.id != filterActive){
            setCurrentWorkbookData([]);
            setCurrentPageNumber(0);
        }
        filterElementClickDispatch({type: 'filterClick', activeFilter: event.currentTarget.id})
        setFilterActive(event.currentTarget.id);
    }

    useEffect(() => {
        setCategory(menuElementActivateSelector);
    }, [menuElementActivateSelector['activeMenu']])

    return (
        <WorkbookListViewPresenter categoryData={category} workbookData={currentWorkbookData} isLastData={workbookData ? workbookData['isLastData'] : false} lastIndex={workbookData ? workbookData['lastIndex'] : 0} favoriteWorkbookData={favData} filterActive={filterActive} filterOnClickHandler={filterOnClickHandler} setCurrentPageNumber={setCurrentPageNumber}/>
    );
}

export default WorkbookListViewContainer;
