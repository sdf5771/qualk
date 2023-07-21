import React from 'react';
import styles from './TestTimer.module.css';
import {ReactComponent as TimerLogo} from 'assets/images/workbook/quiz-test/timer_logo.svg';

function TestTimer({time}: {time: string}){
    return(
        <div className={styles.timer_element_root}>
            <TimerLogo />
            <span>{time ? time : '00:00'}</span>
        </div>
    )
}

export default TestTimer;