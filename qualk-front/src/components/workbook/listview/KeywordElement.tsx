import React from 'react';
import styles from './KeywordElement.module.css';

type KeywordPropsType = {
    keywordTitle: string,
    theme: 'yellow' | 'gray',
}

function KeywordElement({keywordTitle, theme}:KeywordPropsType){
    return(
        <div className={`${styles.keyword_ele_main} ${theme === 'gray' ? styles.gray : styles.yellow}`}>
            <span>#{keywordTitle}</span>
        </div>
    );
}

export default KeywordElement;
