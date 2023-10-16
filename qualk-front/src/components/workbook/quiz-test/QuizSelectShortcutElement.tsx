import React from 'react';
import styles from './QuizSelectShortcutElement.module.css'

function QuizSelectShortcutElement(){

    return (
        <div className={styles.quiz_select_shortcut_root}>
            <div className={styles.header_container}>
                <div>
                    <span>10문제</span>
                </div>
                <div>
                    <span>응시시간 10분</span>
                </div>
            </div>
            <div className={styles.text_container}>
                <span className={styles.title}>처음은 간단하게 시작해볼까요?</span>
                <span className={styles.description}>랜덤으로 출제되는 10문제 퀴즈로 워밍업해보세요!</span>
            </div>
        </div>
    )
}

export default QuizSelectShortcutElement