import React from 'react';
import styles from './LatestHistory.module.css';

function LatestHistory(){
    return(
        <div className={styles.latest_history_root}>
            <div className={styles.header_container}>
                <span>최근기록</span>
                <span>2023년 10월 03일</span>
            </div>
            <div className={styles.test_result_container}>
                <span>5문제</span>
            </div>
            <div className={styles.description_container}>
                <span>최근에 풀었던 GAIQ 10문제 퀴즈에서 <br /> 총 10문제 중 5문제를 맞추셨어요.</span>
            </div>
        </div>
    )
}

export default LatestHistory