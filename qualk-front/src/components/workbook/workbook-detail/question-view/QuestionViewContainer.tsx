import React from 'react';
import QuestionViewPresenter from "./QuestionViewPresenter";
import {WorkbookDataType} from 'components/workbook/type/WorkbookDataType';
import {useNavigate} from 'react-router-dom';

type QuestionViewContainerPropsType = {
    workbookData: WorkbookDataType
}

function QuestionViewContainer({workbookData}: QuestionViewContainerPropsType){
    const navigate = useNavigate();
    return(
        <QuestionViewPresenter navigate={navigate} workbookData={workbookData} />
    )
}

export default QuestionViewContainer;
