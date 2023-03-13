import React from "react";
import {useQuery, useInfiniteQuery} from "@tanstack/react-query";
import getQuestionFindView from 'queries/workbook/listview/getQuestionFindView';
import getQuestionFindOld from 'queries/workbook/listview/getQuestionFindOld';
import getQuestionFindNew from 'queries/workbook/listview/getQuestionFindNew';
import {WorkbookDataType} from 'components/workbook/type/WorkbookDataType';


async function getDatas(type: string, sort: string, pageNumber: number){
    switch(sort){
        case 'sortViewed':
            return getQuestionFindView(type, pageNumber);
        case 'sortOldest':
            return getQuestionFindOld(type, pageNumber);
        case 'sortLatest':
            return getQuestionFindNew(type, pageNumber);
    }
}

async function getMoreDatas(type: string, sort: string, pageNumber: number, currentData: WorkbookDataType[], setCurrentWorkbookData?: React.Dispatch<React.SetStateAction<WorkbookDataType[]>>){
    const newData = await getDatas(type, sort, pageNumber);
    if(setCurrentWorkbookData){
        setCurrentWorkbookData([...currentData, ...newData.workbookData]);
    }

    return {
        workbookData: [...currentData, ...newData.workbookData],
        lastIndex: newData.lastIndex,
        isLastData: newData.isLastData,
    }
}

export default function useWorkbookData(type: string, sort: string, pageNumber: number, currentData: WorkbookDataType[], setCurrentWorkbookData?: React.Dispatch<React.SetStateAction<WorkbookDataType[]>>){
    return useQuery(['datas', sort, pageNumber], () => getMoreDatas(type, sort, pageNumber, currentData, setCurrentWorkbookData), { keepPreviousData: true })
}
