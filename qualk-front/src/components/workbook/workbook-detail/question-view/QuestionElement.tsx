import React from 'react';
import styles from './QuestionElement.module.css';

function QuestionElement(){
    return(
        <div className={styles.question_element_root}>
            <span>데이터는 5일 이내에 복구될 수 있음</span>
        </div>
    )
}

export default QuestionElement;
