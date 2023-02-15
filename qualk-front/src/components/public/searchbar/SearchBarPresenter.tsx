import React from 'react';
import styles from './SearchBarPresenter.module.css'

function SearchBarPresenter(){
    return(
        <div className={styles.search_bar_main}>
            <div className={styles.search_img}>

            </div>
            <div className={styles.input_container}>
                <input className={styles.search_input} placeholder='오늘은 무엇을 찾아볼까요?' />
            </div>
        </div>
    );
}

export default SearchBarPresenter;
