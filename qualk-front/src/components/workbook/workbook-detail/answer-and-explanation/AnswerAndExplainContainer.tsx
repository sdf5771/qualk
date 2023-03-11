import React from 'react';
import AnswerAndExplainPresenter from "./AnswerAndExplainPresenter";
import {WorkbookDataType} from 'components/workbook/type/WorkbookDataType';

type AnswerAndExplainContainerPropsType = {
    workbookData: WorkbookDataType
}

function AnswerAndExplainContainer({workbookData}: AnswerAndExplainContainerPropsType){
    return(
        <AnswerAndExplainPresenter workbookData={workbookData} />
    )
}

export default AnswerAndExplainContainer
