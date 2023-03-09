import React from 'react';
import styles from './QuestionViewPresenter.module.css';
import QuestionElement from "./QuestionElement";
import AnswerAndExplainContainer from "components/workbook/workbook-detail/answer-and-explanation/AnswerAndExplainContainer";

function QuestionViewPresenter(){
    return(
        <div className={styles.question_view_root}>
            <div className={styles.question_view_title_container}>
                <span>GAIQ (Google Analytics) #23</span>
                <span>Q. 필터가 적용된 후 필터링된 데이터를 복구할 수 있는 옵션은?</span>
            </div>
            <div className={styles.question_container}>
                <QuestionElement />
                <QuestionElement />
                <QuestionElement />
                <QuestionElement />
            </div>
            <AnswerAndExplainContainer />
            <div>

            </div>
        </div>
    )
}

export default QuestionViewPresenter;
