import React from 'react';
import styles from 'stylesheets/workbook/quiz-test/QuizTestMain.module.css';
import publicAnimations from 'stylesheets/public/animation.module.css';
import {ReactComponent as GaiqLogo} from 'assets/images/workbook/listview/gaiq_logo.svg';

function QuizTestMain(){
    return (
        <div className={`${styles.quiz_test_root} ${publicAnimations.fade_in}`}>
            <div className={styles.quiz_test_header}>
                <div className={styles.quiz_test_title_container}>
                    <GaiqLogo width="50px" height="50px"/>
                    <span>GAIQ</span>
                </div>

                <div className={styles.test_list_container}>
                    <div className={styles.test_list_header}>
                        <span>테스트를 대비하세요!</span>
                    </div>
                    <div className={styles.test_list_body}>

                    </div>
                </div>

                <div className={styles.mockexam_container}>
                    <div className={styles.mockexam_header}>
                        <span>실전과 비슷한 환경의 모의고사에요.</span>
                    </div>
                    <div className={styles.mockexam_body}>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default QuizTestMain;