import React, {useState, useEffect} from 'react';
import styles from './QuizContentRadio.module.css';

type TQuizContentRadio = {
    value: string;
    index: number;
    isMutate: boolean;
    selectIndex: number | null;
    correctIndex: number | null;
    isMockExam: boolean;
    onChangeHandler?: React.ChangeEventHandler;
}

function QuizContentRadio({value, index, isMutate, selectIndex, correctIndex, isMockExam, onChangeHandler}: TQuizContentRadio){
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [isSelected, setIsSelected] = useState<boolean | null>(null);

    useEffect(() => {
        if(isMutate){
            if(index === selectIndex){
                setIsSelected(true)
            }
            if(index === correctIndex){
                setIsCorrect(true);
            }
        }
    }, [isMutate])

    return(
        <div className={styles.content_radio_root}>
            <div className={styles.input_container}><input onChange={onChangeHandler} type="radio" name="quiz_content" id={value} value={value}/></div>
            <div className={`${styles.label_container} ${isCorrect && isSelected && !isMockExam ? styles.answer : isCorrect && !isMockExam ? styles.answer : isSelected && !isMockExam ? styles.select : ''}`}>
                <label htmlFor={value}>{value}</label>
                {isMutate ? 
                <p 
                    className={`${styles.explain_p} 
                    ${isCorrect && isSelected ? 
                        styles.answer 
                        : isCorrect ? styles.answer 
                        : isSelected ? styles.select 
                        : ''}`}>{isCorrect && isSelected && !isMockExam ? "정답" : isCorrect && !isMockExam ? "정답" : isSelected && !isMockExam ? "내가 선택한 답" : ''}</p> 
                : null}
            </div>
        </div>
    )
}

export default QuizContentRadio;