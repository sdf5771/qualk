import React, {useState, useEffect} from 'react';
import AnswerAndExplainPresenter from "./AnswerAndExplainPresenter";
import {WorkbookDataType} from 'components/workbook/type/WorkbookDataType';

type AnswerAndExplainContainerPropsType = {
    workbookData: WorkbookDataType
}

function AnswerAndExplainContainer({workbookData}: AnswerAndExplainContainerPropsType){
    const [answer, setAnswer] = useState('');
    useEffect(() => {
        if(workbookData && workbookData.question_contents){
            workbookData.question_contents.forEach((content, index) => {
                if(parseInt(workbookData.question_correct) === index){
                    setAnswer(content);
                }
            });
        }
    })

    return(
        <AnswerAndExplainPresenter workbookData={workbookData} answer={answer} />
    )
}

export default AnswerAndExplainContainer
