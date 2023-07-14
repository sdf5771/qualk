import React from 'react';
import styles from './MockExamSelectElement.module.css';
import {ReactComponent as CountContainer} from 'assets/images/workbook/quiz-test/mocktest_testcount.svg';
import {ReactComponent as TimeContainer} from 'assets/images/workbook/quiz-test/mocktest_test_time.svg';

type TMockExamSelectElementProps = {
    testLength: number;
    time: number;
    title: string;
    description: string;
    SVGComponent?: React.FunctionComponent;
    clickEventHandler?: React.MouseEventHandler;
}

function MockExamSelectElement({testLength, time, title, description, SVGComponent, clickEventHandler}:TMockExamSelectElementProps){
    return (
        <div onClick={clickEventHandler} className={styles.mock_exam_select_element_root}>
            <div className={styles.mock_exam_select_element_info_container}>
                <div className={styles.mock_exam_select_element_header}>
                    <div className={styles.svg_container}>
                        <CountContainer />
                        <span>{testLength}문제</span>
                    </div>
                    <div className={styles.svg_container}>
                        <TimeContainer />
                        <span>응시시간 {time}분</span>
                    </div>
                    {/* <div className={`${styles.mock_exam_decobox} ${styles.bg_color}`}>
                        <span>{testLength}문제</span>
                    </div>
                    <div className={`${styles.mock_exam_decobox} ${styles.border_color}`}>
                        <span>응시시간 {time}분</span>
                    </div> */}
                </div>

                <div className={styles.mock_exam_select_element_content_container}>
                    <div>
                        <span>{title}</span>
                    </div>
                    <div>
                        <span>{description}</span>
                    </div>
                </div>

            </div>
            <div className={styles.mock_exam_select_element_image_container}>
                {SVGComponent ? <SVGComponent /> : null}
            </div>
        </div>
    )
}

export default MockExamSelectElement;