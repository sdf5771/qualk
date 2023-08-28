import React from 'react';
import styles from './ResultPreview.module.css';
import {ReactComponent as MockTestPassed} from 'assets/images/workbook/quiz-test/mocktest_passed.svg';
import {ReactComponent as MockTestFailed} from 'assets/images/workbook/quiz-test/mocktest_failed.svg';
import {ReactComponent as MockTestPerfect} from 'assets/images/workbook/quiz-test/mocktest_perfect.svg';

type TResultPreview = {
    totalIndex: number;
    userCorrected: number;
    passPercent: number;
    passNum: number;
    totalTime: number;
    isPass: boolean;
    isPerfect: boolean;
}

function ResultPreview({totalIndex, userCorrected, passPercent, passNum, totalTime, isPass, isPerfect}: TResultPreview){
    return (
        <div className={styles.result_preview_root}>
            <div className={styles.background_image_container}>
                {isPerfect ? <MockTestPerfect /> : isPass ? <MockTestPassed /> : <MockTestFailed />}
            </div>
            <div className={styles.info_box}>
                <span className={styles.user_text}>{isPerfect ? "완벽해요!" : isPass ? "축하드려요!" : "아쉬워요."}</span>
                <span className={styles.quiz_result_text}>{isPerfect ? "모의고사를 모두 맞혔어요!" : isPass ? "모의 테스트를 통과하셨어요!" : "다시 도전해볼까요?"}</span>
                <div className={styles.p_tag_container}>
                    <p>전체 {totalIndex}문제</p>
                    <p>중 {userCorrected}문제를 맞추셨어요{isPass ? "!" : '.'}</p>
                </div>
                <div className={styles.test_info_container}>
                    <span className={styles.test_description}>{isPerfect ? "실전까지 이대로만 쭉쭉! 만점이지만 방심은 금물!" : `GAIQ 인증평가 모의 테스트는 ${totalIndex}문항으로 구성되어 있으며 응시시간 ${totalTime}분안에 완료해야 합니다.`}</span>
                    <span className={styles.test_description}>{isPerfect ? "다음 시험에도 완벽한 모습 기대할게요!" : `GAIQ 인증평가 모의 테스트를 통과하려면 ${passPercent}%이상의 점수(${passNum}문제 이상 정답)가 필요합니다.`}</span>
                </div>
            </div>
        </div>
    )
}

export default ResultPreview;