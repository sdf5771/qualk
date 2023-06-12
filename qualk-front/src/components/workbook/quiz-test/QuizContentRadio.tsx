import React from 'react';
import styles from './QuizContentRadio.module.css';
import publicAnimation from 'stylesheets/public/animation.module.css';

type TQuizContentRadio = {
    value: string;
    onChangeHandler?: React.ChangeEventHandler;
}

function QuizContentRadio({value, onChangeHandler}: TQuizContentRadio){
    return(
        <div className={styles.content_radio_root}>
            <div><input onChange={onChangeHandler} type="radio" name="quiz_content" id={value} value={value}/></div>
            <label htmlFor={value}>{value}</label>
        </div>
    )
}

export default QuizContentRadio;