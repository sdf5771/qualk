import React, {useState, useEffect} from 'react';
import styles from './QuizContentRadio.module.css';

type TQuizContentRadio = {
    value: string;
    index: number;
    isMutate: boolean;
    selectIndex: number | null;
    correctIndex: number | null;
    onChangeHandler?: React.ChangeEventHandler;
}

function QuizContentRadio({value, index, isMutate, selectIndex, correctIndex, onChangeHandler}: TQuizContentRadio){
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
            <div className={`${styles.label_container} ${isCorrect && isSelected ? styles.answer : isCorrect ? styles.answer : isSelected ? styles.select : ''}`}>
                <label htmlFor={value}>{value}</label>
                {isMutate ? 
                <p 
                    className={`${styles.explain_p} 
                    ${isCorrect && isSelected ? 
                        styles.answer 
                        : isCorrect ? styles.answer 
                        : isSelected ? styles.select 
                        : ''}`}>{isCorrect && isSelected ? "정답" : isCorrect ? "정답" : isSelected ? "내가 선택한 답" : ''}</p> 
                : null}
            </div>
        </div>
    )
}

export default QuizContentRadio;