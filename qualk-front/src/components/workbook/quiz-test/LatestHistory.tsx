import React from 'react';
import styles from './LatestHistory.module.css';

type Tprops = {
    latestCorrect: number | null,
    latestQuestionNum: number | null,
    date: string,
    totalIndex: number
}

function LatestHistory({latestCorrect, latestQuestionNum, date, totalIndex}:Tprops){
    const [year, month, day] = date.split('-')

    return(
        <div className={styles.latest_history_root}>
            <div className={styles.header_container}>
                <span>최근기록</span>
                {
                    year !== '' ? <span>{year}년 {month}월 {day}일</span> : null
                }                
            </div>
            <div className={styles.test_result_container}>
                {
                    latestQuestionNum ? <span>{latestCorrect}문제</span> : <span>첫 도전! 어떠셨나요?</span>
                }
            </div>
            <div className={styles.description_container}>
                {
                    latestQuestionNum ? 
                    <span>최근에 풀었던 GAIQ {latestQuestionNum}문제 퀴즈에서 <br /> 총 {latestQuestionNum}문제 중 {latestCorrect}문제를 맞추셨어요.</span>
                    : <span>처음으로 GAIQ {totalIndex}문제 퀴즈를 <br />
                    도전하셨어요!</span>
                }
            </div>
        </div>
    )
}

export default LatestHistory