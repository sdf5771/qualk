import React from 'react';
import styles from './NoSearchResult.module.css';
import {ReactComponent as NoContentLogo} from 'assets/images/public/no_contents_logo.svg';

function NoSearchResult(){
    return(
        <div className={styles.no_search_result_root}>
            <div style={{marginTop: '80px'}}>
                <NoContentLogo width={120} height={120} />
            </div>
            <div className={styles.description_container}>
                <span className={styles.text_normal}>검색된 문제나 태그가 없어요.</span>
                <span className={styles.text_bold}>검색어를 변경해 보세요!</span>
            </div>
        </div>
    )
}

export default NoSearchResult;