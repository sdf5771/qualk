import React from 'react';
import styles from './ResultPreview.module.css';
import {ReactComponent as TestResultFailedImage} from 'assets/images/workbook/quiz-test/test_result_failed.svg';
import {ReactComponent as MockTestPassed} from 'assets/images/workbook/quiz-test/mocktest_passed.svg';
import {ReactComponent as MockTestFailed} from 'assets/images/workbook/quiz-test/mocktest_failed.svg';

type TResultPreview = {
    totalIndex: number;
    userCorrected: number;
    passPercent: number;
    passNum: number;
    totalTime: number;
    isPass: boolean;
}

function ResultPreview({totalIndex, userCorrected, passPercent, passNum, totalTime, isPass}: TResultPreview){
    return (
        <div className={styles.result_preview_root}>
            <div className={styles.background_image_container}>
                {isPass ? <MockTestPassed /> : <MockTestFailed />}
            </div>
            <div className={styles.info_box}>
                <span className={styles.user_text}>{isPass ? "축하드려요!" : "아쉬워요."}</span>
                <span className={styles.quiz_result_text}>{isPass ? "모의 테스트를 통과하셨어요!" : "다시 도전해볼까요?"}</span>
                <div className={styles.p_tag_container}>
                    <p>전체 {totalIndex}문제</p>
                    <p>중 {userCorrected}문제를 맞추셨어요{isPass ? "!" : '.'}</p>
                </div>
                <div className={styles.test_info_container}>
                    <span className={styles.test_description}>GAIQ 인증평가 모의 테스트는 {totalIndex}문항으로 구성되어 있으며 응시시간 {totalTime}분안에 완료해야 합니다.</span>
                    <span className={styles.test_description}>GAIQ 인증평가 모의 테스트를 통과하려면 {passPercent}%이상의 점수({passNum}문제 이상 정답)가 필요합니다.</span>
                </div>
            </div>
        </div>
    )
}

export default ResultPreview;