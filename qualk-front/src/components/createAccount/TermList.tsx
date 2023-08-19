import React from 'react';
import styles from './TermList.module.css';

function TermList(){
    return (
        <div className={styles.term_list}>
            <div className={styles.all_agree_box}>
                <input className={styles.radio_style} type="radio" />
                <span>전체 약관 동의</span>
            </div>
            <div className={styles.ordinary_term_box}>
                <input className={styles.radio_style} type="radio" />
                <span>전체 약관 동의</span>
            </div>
        </div>
    )
}

export default TermList;