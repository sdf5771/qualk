import React from 'react';
import styles from './QuestionElement.module.css';

type QuestionElementPropsType = {
    questionTitle: string,
    isCorrect: boolean,
}

function QuestionElement({questionTitle, isCorrect}: QuestionElementPropsType){
    return(
        <div className={styles.question_element_root}>
            <div className={`${styles.select_box} ${isCorrect ? styles.correct : ''}`}>
                <div className={styles.circle}></div>
            </div>
            <div className={`${styles.title_container} ${isCorrect ? styles.correct : ''}`}>
                <span>{questionTitle}</span>
            </div>
        </div>
    )
}

export default QuestionElement;
