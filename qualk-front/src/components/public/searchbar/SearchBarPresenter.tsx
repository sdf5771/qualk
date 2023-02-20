import React from 'react';
import styles from './SearchBarPresenter.module.css'
import {ReactComponent as SearchIcon} from 'assets/images/workbook/searchbar/search_icon.svg';

function SearchBarPresenter(){
    return(
        <div className={styles.search_bar_main}>
            <SearchIcon width="24px" height="24px"/>
            <div className={styles.input_container}>
                <input className={styles.search_input} placeholder='오늘은 무엇을 찾아볼까요?' />
            </div>
        </div>
    );
}

export default SearchBarPresenter;
