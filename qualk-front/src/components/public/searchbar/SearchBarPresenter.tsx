import React, {ReactEventHandler} from 'react';
import styles from './SearchBarPresenter.module.css'
import {ReactComponent as SearchIcon} from 'assets/images/workbook/searchbar/search_icon.svg';
import {ReactComponent as SearchIconActive} from 'assets/images/workbook/searchbar/search_icon_active.svg';
import {ReactComponent as CloseIcon} from 'assets/images/workbook/searchbar/close_icon.svg';

type SearchBarPresenterPropsType = {
    isActive: boolean,
    isHover: boolean,
    inputOnClickHandler: ReactEventHandler,
    inputOnChangeHandler: ReactEventHandler,
    inputOnBlurHandler: ReactEventHandler,
    onMouseOverHandler: ReactEventHandler,
    onMouseOutHandler: ReactEventHandler,
    inputVal: string,
    isVisibleClose: boolean,
}

function SearchBarPresenter({inputOnClickHandler, inputOnChangeHandler, inputOnBlurHandler, onMouseOverHandler, onMouseOutHandler, isActive, isHover, inputVal, isVisibleClose}:SearchBarPresenterPropsType){
    let logo;

    if(isActive || isHover){
        logo = <SearchIconActive width="24px" height="24px"/>
    } else {
        logo = <SearchIcon width="24px" height="24px"/>
    }

    return(
        <div onMouseOver={onMouseOverHandler}
             onMouseOut={onMouseOutHandler}
             className={`${styles.search_bar_main} ${isActive ? styles.active : ''}`}
        >
            {logo}
            <div className={styles.input_container}>
                <input onClick={inputOnClickHandler}
                       onChange={inputOnChangeHandler}
                       onBlur={inputOnBlurHandler}
                       className={styles.search_input}
                       placeholder='오늘은 무엇을 찾아볼까요?'
                       value={inputVal}
                />
                {isVisibleClose ? <CloseIcon /> : null}
            </div>
        </div>
    );
}

export default SearchBarPresenter;
