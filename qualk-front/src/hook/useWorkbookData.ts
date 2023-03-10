import {useQuery} from "@tanstack/react-query";
import getQuestionFindView from 'queries/workbook/listview/getQuestionFindView';
import getQuestionFindOld from 'queries/workbook/listview/getQuestionFindOld';
import getQuestionFindNew from 'queries/workbook/listview/getQuestionFindNew';

async function getDatas(sort: string){
    switch(sort){
        case 'sortViewed':
            return getQuestionFindView();
        case 'sortOldest':
            return getQuestionFindOld();
        case 'sortLatest':
            return getQuestionFindNew();
    }

}

export default function useWorkbookData(sort: string){
    return useQuery(['datas', sort], () => getDatas(sort))
}
