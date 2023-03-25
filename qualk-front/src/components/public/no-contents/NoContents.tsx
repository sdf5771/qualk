import React from 'react';
import styles from 'components/public/no-contents/NoContents.module.css';

function NoContents(){
    return(
        <div className={styles.no_contents_root}>
            <div className={styles.no_contents_logo_container}>
                <div></div>
            </div>
            <div className={styles.title}><span>아직 준비중 이에요...</span></div>
            <div className={styles.description}><span>아직 준비되지 않은 콘텐츠에요.. 현재 활성화된 콘텐츠를 방문해 볼까요?</span></div>
        </div>
    )
}

export default NoContents;
