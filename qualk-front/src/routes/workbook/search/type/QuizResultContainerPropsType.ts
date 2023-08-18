import {WorkbookDataType} from 'components/workbook/type/WorkbookDataType';

export interface QuizResultContainerPropsType {
    containerTitle: string,
    containerType: string,
    searchType: string,
    searchKeyword: string,
    searchData: {
        quizList: WorkbookDataType[],
        page: number,
        total: number,
    },
}
