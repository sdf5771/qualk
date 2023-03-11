import React from 'react';
import styles from './QuestionElement.module.css';

type QuestionElementPropsType = {
    questionTitle: string,
    isCorrect: boolean,
}

function QuestionElement({questionTitle, isCorrect}: QuestionElementPropsType){
    return(
        <div className={`${styles.question_element_root} ${isCorrect ? styles.correct : ''}`}>
            <span>{questionTitle}</span>
        </div>
    )
}

export default QuestionElement;
