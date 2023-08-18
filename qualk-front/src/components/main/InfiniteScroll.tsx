import React from 'react';
import styles from './InfiniteScroll.module.css';

function InfiniteScroll(){
    return(
        <div className={styles.infinite_scroll}>
            <span className={styles.text}>SCROLL</span>
            <div className={styles.deco}></div>
        </div>
    )
}

export default InfiniteScroll;