import React from 'react';
import styles from './ResultPreview.module.css';
import {ReactComponent as TestResultFailedImage} from 'assets/images/workbook/quiz-test/test_result_failed.svg';

function ResultPreview(){
    return (
        <div className={styles.result_preview_root}>
            <div className={styles.info_box}>
                <span className={styles.user_text}>아쉬워요, 섭우님</span>
                <span className={styles.quiz_result_text}>다시 도전해볼까요?</span>
                <div className={styles.p_tag_container}>
                    <p>전체 50문제</p>
                    <p>중 20문제를 맞추셨어요.</p>
                </div>
                <div className={styles.test_info_container}>
                    <span className={styles.test_title}>GAIQ 합격 기준</span>
                    <span className={styles.test_description}>GAIQ 인증평가 모의 테스트는 50문항으로 구성되어 있으며 응시시간 75분안에 완료해야 합니다.</span>
                    <span className={styles.test_description}>GAIQ 인증평가 모의테스트를 통과하려면 80%이상의 점수(40문제 이상 정답)가 필요합니다.</span>
                </div>
            </div>
            <div className={styles.result_qualk_image_container}>
                <TestResultFailedImage />
            </div>
        </div>
    )
}

export default ResultPreview;