import React, {useEffect, useState} from 'react';
import styles from './QuizSelectElement.module.css';

type TQuizSelectElementProps = {
    testLength: number;
    time: number;
    title: string;
    description: string;
    SVGComponent?: React.FunctionComponent;
    SVGComponentHover?: React.FunctionComponent;
    option: {
        backgroundColor: string;
        fontColor: string;
    }
    onClickHandler?: React.MouseEventHandler<HTMLDivElement>,
}

function QuizSelectElement({testLength, time, title, description, SVGComponent, SVGComponentHover, option, onClickHandler}:TQuizSelectElementProps){
    const [isHover, setIsHover] = useState(false);
    const [borderColor, setBorderColor] = useState('');
    let isEasyColor = borderColor === '#ffba00';
    let isMedinmColor = borderColor === '#ff9300';
    let isHardColor = borderColor === '#ff6c00';

    useEffect(() => {
        setBorderColor(option.backgroundColor);
    }, [])

    const mouseHoverHandler = (event: React.MouseEvent) => {
        setIsHover(true)
    }

    const mouseLeaveHandler = (event: React.MouseEvent) => {
        setIsHover(false)
    }

    return (
        <div className={`${styles.quiz_select_element_root} ${isEasyColor ? styles.ffba00 : ''} ${isMedinmColor ? styles.ff9300 : ''} ${isHardColor ? styles.ff6c00 : ''}`} onClick={onClickHandler} onMouseOver={mouseHoverHandler} onMouseLeave={mouseLeaveHandler}>
            <div className={styles.quiz_select_element_header}>
                <div style={{backgroundColor: `${option?.backgroundColor}`}} className={styles.quiz_decobox}>
                    <span style={{color: option?.fontColor}}>{testLength}문제</span>
                </div>
                {/* <div style={{backgroundColor: `${option?.backgroundColor}`}} className={styles.quiz_decobox}>
                    <span style={{color: option?.fontColor}}>응시시간 {time}분</span>
                </div> */}
            </div>
            <div className={styles.quiz_select_element_content_container}>
                <span>{title}</span>
                <span>{description}</span>
            </div>
            <div className={styles.quiz_select_element_image_container}>
                {/* {SVGComponent ? <SVGComponent /> : null} */}
                {SVGComponentHover && isHover ? <SVGComponentHover /> : SVGComponent ? <SVGComponent /> : null}
            </div>
        </div>
    )
}

export default QuizSelectElement;