import React from 'react';
import styles from './AnswerAndExplainPresenter.module.css';
import {WorkbookDataType} from 'components/workbook/type/WorkbookDataType';

type AnswerAndExplainPresenterPropsType = {
    workbookData: WorkbookDataType
    answer: string
}

function AnswerAndExplainPresenter({workbookData, answer}:AnswerAndExplainPresenterPropsType){
    const referenceURL = workbookData && workbookData.question_reference ? workbookData.question_reference : '';

    return(
        <div className={styles.answer_explain_root}>
            <div className={styles.title_container}>
                <span>정답 및 해설</span>
            </div>
            <div className={styles.content_container}>
                <div className={styles.answer_container}>
                    <span>{answer}</span>
                </div>
                <div className={styles.explain_container}>
                    <span>{workbookData ? workbookData.question_description : ''}</span>
                </div>
                <div className={styles.reference_container}>
                    {
                        workbookData && workbookData.question_reference ?
                        <>
                            <span>참고 : </span>
                            <span>{`${referenceURL}`}</span>
                        </>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}

export default AnswerAndExplainPresenter;
