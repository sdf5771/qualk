import React from 'react';
import styles from './KeywordElement.module.css';

type KeywordPropsType = {
    keywordTitle: string,
}

function KeywordElement({keywordTitle}:KeywordPropsType){
    return(
        <div className={styles.keyword_ele_main}>
            <span>#{keywordTitle}</span>
        </div>
    );
}

export default KeywordElement;
