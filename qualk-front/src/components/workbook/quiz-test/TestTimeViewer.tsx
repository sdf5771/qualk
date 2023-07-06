import React from 'react';
import styles from './TestTimeViewer.module.css';

type TTestTimeViewerProps = {
    userTime: number;
    totalTime: number;
    comment: string;
    isPass: boolean;
}

function TestTimeViewer({userTime, totalTime, comment, isPass}: TTestTimeViewerProps){
    console.log('isPass ', isPass);
    return(
        <div className={styles.test_time_view_root}>
            <div className={styles.title_container}>
                <span>소요시간</span>
                <p>전체 {totalTime}분</p>
            </div>
            <div className={styles.timestamp_container}>
                <span className={isPass ? styles.passed : styles.failed}>{userTime}분</span>
            </div>
            <div className={styles.description_container}>
                <p>{comment}</p>
            </div>
        </div>
    )
}

export default TestTimeViewer;