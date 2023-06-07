import React from 'react';
import styles from './MockExamSelectElement.module.css';

type TMockExamSelectElementProps = {
    testLength: number;
    time: number;
    title: string;
    description: string;
    SVGComponent?: React.FunctionComponent;
}

function MockExamSelectElement({testLength, time, title, description, SVGComponent}:TMockExamSelectElementProps){
    return (
        <div className={styles.mock_exam_select_element_root}>
            <div className={styles.mock_exam_select_element_info_container}>
                <div className={styles.mock_exam_select_element_header}>
                    <div className={`${styles.mock_exam_decobox} ${styles.bg_color}`}>
                        <span>{testLength}문항</span>
                    </div>
                    <div className={`${styles.mock_exam_decobox} ${styles.border_color}`}>
                        <span>응시시간 {time}분</span>
                    </div>
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