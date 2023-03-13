import React from "react";
import {useQuery, useInfiniteQuery} from "@tanstack/react-query";
import getQuestionFindView from 'queries/workbook/listview/getQuestionFindView';
import getQuestionFindOld from 'queries/workbook/listview/getQuestionFindOld';
import getQuestionFindNew from 'queries/workbook/listview/getQuestionFindNew';
import {WorkbookDataType} from 'components/workbook/type/WorkbookDataType';


async function getDatas(sort: string, pageNumber: number){
    switch(sort){
        case 'sortViewed':
            return getQuestionFindView(pageNumber);
        case 'sortOldest':
            return getQuestionFindOld(pageNumber);
        case 'sortLatest':
            return getQuestionFindNew(pageNumber);
    }
}

async function getMoreDatas(sort: string, pageNumber: number, currentData: WorkbookDataType[], setCurrentWorkbookData?: React.Dispatch<React.SetStateAction<WorkbookDataType[]>>){
    const newData = await getDatas(sort, pageNumber);
    if(setCurrentWorkbookData){
        setCurrentWorkbookData([...currentData, ...newData.workbookData]);
    }

    return {
        workbookData: [...currentData, ...newData.workbookData],
        lastIndex: newData.lastIndex,
        isLastData: newData.isLastData,
    }
}

export default function useWorkbookData(sort: string, pageNumber: number, currentData: WorkbookDataType[], setCurrentWorkbookData?: React.Dispatch<React.SetStateAction<WorkbookDataType[]>>){
    return useQuery(['datas', sort, pageNumber], () => getMoreDatas(sort, pageNumber, currentData, setCurrentWorkbookData), { keepPreviousData: true })
}
