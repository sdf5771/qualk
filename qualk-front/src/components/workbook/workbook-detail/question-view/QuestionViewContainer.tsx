import React from 'react';
import QuestionViewPresenter from "./QuestionViewPresenter";
import {WorkbookDataType} from 'components/workbook/type/WorkbookDataType';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";

type QuestionViewContainerPropsType = {
    workbookData: WorkbookDataType
}

function QuestionViewContainer({workbookData}: QuestionViewContainerPropsType){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return(
        <QuestionViewPresenter navigate={navigate} workbookData={workbookData} dispatch={dispatch} />
    )
}

export default QuestionViewContainer;
