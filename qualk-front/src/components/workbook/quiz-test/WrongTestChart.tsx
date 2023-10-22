import React from 'react';
import styles from './WrongTestChart.module.css';
import CustomDoughnutChart from 'components/workbook/quiz-test/CustomDoughnutChart';

type TWrongTestChartProps = {
    userCorrected: number;
    totalIndex: number;
    correctPercent: number;
    command: string;
    isPass: boolean;
    isPerfect: boolean;
    isHalfSize?: boolean;
}

function WrongTestChart({userCorrected, totalIndex, correctPercent, command, isPass, isPerfect, isHalfSize}: TWrongTestChartProps){
    return(
        <div className={`${styles.wrong_test_chart_root} ${isHalfSize ? styles.half_size : ''}`}>
            <div className={styles.explain_container}>
                <div className={styles.header}>
                    <span>틀린문제</span>
                    <p>전체 {totalIndex}문제</p>
                </div>
                <div className={styles.wrong_test_container}>
                    <span className={isPerfect ? styles.perfect : isPass ? styles.passed : styles.failed}>{totalIndex - userCorrected}문제</span>
                </div>
                <div className={styles.feedback_container}>
                    <p>{command}</p>
                </div>
            </div>
            <div className={styles.chart_container}>
                <div className={styles.chart}>
                    <CustomDoughnutChart correctPercent={correctPercent} isPass={isPass} isPerfect={isPerfect} />
                </div>
                <div className={styles.chart_description_container}><p>정답률</p></div>
            </div>
        </div>
    )
}

export default WrongTestChart;