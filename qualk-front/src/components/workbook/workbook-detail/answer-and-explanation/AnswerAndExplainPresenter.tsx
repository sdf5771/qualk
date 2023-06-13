import React from 'react';
import styles from './AnswerAndExplainPresenter.module.css';
import {WorkbookDataType} from 'components/workbook/type/WorkbookDataType';

type AnswerAndExplainPresenterPropsType = {
    description: string | null,
    referenceData: string | null,
    answer: string
}

function AnswerAndExplainPresenter({description, referenceData, answer}:AnswerAndExplainPresenterPropsType){
    const referenceURL = referenceData ? referenceData : '';

    return(
        <div className={styles.answer_explain_root}>
            <div className={styles.title_container}>
                <span>정답 및 해설</span>
            </div>
            <div className={styles.content_container}>
                {answer ? 
                    <div className={styles.answer_container}>
                        <span>{answer}</span>
                    </div>
                : null}
                {description ? 
                    <div className={styles.explain_container}>
                        <span>{description ? description : ''}</span>
                    </div>
                : null}
                {
                    referenceURL !== '' && referenceURL ?
                    <div className={styles.reference_container}>
                        <span>참고 : </span>
                        <span>{`${referenceURL}`}</span>
                    </div>
                    : null
                }
            </div>
        </div>
    )
}

export default AnswerAndExplainPresenter;
