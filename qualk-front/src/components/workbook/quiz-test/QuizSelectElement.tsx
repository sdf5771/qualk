import React from 'react';
import styles from './QuizSelectElement.module.css';

type TQuizSelectElementProps = {
    testLength: number;
    time: number;
    title: string;
    description: string;
    SVGComponent?: React.FunctionComponent;
    option: {
        backgroundColor: string;
        fontColor: string;
    }
    onClickHandler?: React.MouseEventHandler<HTMLDivElement>,
}

function QuizSelectElement({testLength, time, title, description, SVGComponent, option, onClickHandler}:TQuizSelectElementProps){
    return (
        <div className={styles.quiz_select_element_root} onClick={onClickHandler}>
            <div className={styles.quiz_select_element_header}>
                <div style={{backgroundColor: `${option?.backgroundColor}`}} className={styles.quiz_decobox}>
                    <span style={{color: option?.fontColor}}>{testLength}문제</span>
                </div>
                <div style={{backgroundColor: `${option?.backgroundColor}`}} className={styles.quiz_decobox}>
                    <span style={{color: option?.fontColor}}>응시시간 {time}분</span>
                </div>
            </div>
            <div className={styles.quiz_select_element_content_container}>
                <span>{title}</span>
                <span>{description}</span>
            </div>
            <div className={styles.quiz_select_element_image_container}>
                {SVGComponent ? <SVGComponent /> : null}
            </div>
        </div>
    )
}

export default QuizSelectElement;