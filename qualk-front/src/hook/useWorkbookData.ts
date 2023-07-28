import React from "react";
import {useQuery} from "@tanstack/react-query";
import {WorkbookDataType} from 'components/workbook/type/WorkbookDataType';
import getQuestionList from "queries/workbook/listview/getQuestionList";


async function getDatas(type: string, sort: string, pageNumber: number){
    switch(sort){
        case 'sortViewed':
            return getQuestionList(type, 'view', pageNumber, 6);
        case 'sortOldest':
            return getQuestionList(type, 'old', pageNumber, 6);
        case 'sortLatest':
            return getQuestionList(type, 'new', pageNumber, 6);
    }
}

async function getMoreDatas(type: string, sort: string, pageNumber: number, currentData: WorkbookDataType[], setCurrentWorkbookData?: React.Dispatch<React.SetStateAction<WorkbookDataType[]>>){
    const newData = await getDatas(type, sort, pageNumber);
    
    if(setCurrentWorkbookData){
        setCurrentWorkbookData([...currentData, ...newData.quizList]);
    }

    return {
        workbookData: [...currentData, ...newData.quizList],
        currentPage: newData.page,
        totalPage: newData.total,
    }

}

export default function useWorkbookData(type: string, sort: string, pageNumber: number, currentData: WorkbookDataType[], setCurrentWorkbookData?: React.Dispatch<React.SetStateAction<WorkbookDataType[]>>){
    return useQuery(['datas', type, sort, pageNumber], () => getMoreDatas(type, sort, pageNumber, currentData, setCurrentWorkbookData), { keepPreviousData: true })
}
