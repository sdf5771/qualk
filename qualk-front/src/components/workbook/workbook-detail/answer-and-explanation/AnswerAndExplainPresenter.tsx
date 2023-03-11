import React from 'react';
import styles from './AnswerAndExplainPresenter.module.css';
import {WorkbookDataType} from 'components/workbook/type/WorkbookDataType';

type AnswerAndExplainPresenterPropsType = {
    workbookData: WorkbookDataType
}

function AnswerAndExplainPresenter({workbookData}:AnswerAndExplainPresenterPropsType){
    return(
        <div className={styles.answer_explain_root}>
            <div className={styles.title_container}>
                <span>정답 및 해설</span>
            </div>
            <div className={styles.content_container}>
                <div className={styles.answer_container}>
                    <span>{workbookData ? workbookData.question_name : ''}</span>
                </div>
                <div className={styles.explain_container}>
                    <span>{workbookData ? workbookData.question_description : ''}</span>
                </div>
                <div className={styles.reference_container}>
                    <span>참고 : </span>
                    <span>https://support.google.com/analytics/answer/6086075</span>
                </div>
            </div>
        </div>
    )
}

export default AnswerAndExplainPresenter;
