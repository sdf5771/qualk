import React, {ReactEventHandler} from 'react';
import styles from './SearchBarPresenter.module.css'
import {ReactComponent as SearchIcon} from 'assets/images/workbook/searchbar/search_icon.svg';
import {ReactComponent as SearchIconActive} from 'assets/images/workbook/searchbar/search_icon_active.svg';
import {ReactComponent as CloseIcon} from 'assets/images/workbook/searchbar/close_icon.svg';
import { ReponsiveMobile, ReponsivePC, ReponsiveTabletPC } from 'components/public/responsive-wrapper/ResponsiveWrapper';

type SearchBarPresenterPropsType = {
    isActive: boolean,
    isHover: boolean,
    inputOnClickHandler: ReactEventHandler,
    inputOnChangeHandler: ReactEventHandler,
    inputOnKeyUpHandler: ReactEventHandler,
    inputOnBlurHandler: ReactEventHandler,
    onMouseOverHandler: ReactEventHandler,
    onMouseOutHandler: ReactEventHandler,
    removeValueOnClickHandler: ReactEventHandler,
    inputVal: string,
    isVisibleClose: boolean,
}

function SearchBarPresenter({inputOnClickHandler, inputOnChangeHandler, inputOnKeyUpHandler, inputOnBlurHandler, onMouseOverHandler, onMouseOutHandler, removeValueOnClickHandler, isActive, isHover, inputVal, isVisibleClose}:SearchBarPresenterPropsType){
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
                <ReponsivePC>
                    <input onClick={inputOnClickHandler}
                        onChange={inputOnChangeHandler}
                        onKeyUp={inputOnKeyUpHandler}
                        onBlur={inputOnBlurHandler}
                        className={styles.search_input}
                        placeholder='오늘은 무엇을 찾아볼까요?'
                        value={inputVal}
                    />
                </ReponsivePC>
                <ReponsiveTabletPC>
                    <input onClick={inputOnClickHandler}
                        onChange={inputOnChangeHandler}
                        onKeyUp={inputOnKeyUpHandler}
                        onBlur={inputOnBlurHandler}
                        className={styles.search_input}
                        placeholder='검색하고 싶은 키워드를 입력하세요!'
                        value={inputVal}
                    />
                </ReponsiveTabletPC>
                <ReponsiveMobile>
                    <input onClick={inputOnClickHandler}
                        onChange={inputOnChangeHandler}
                        onKeyUp={inputOnKeyUpHandler}
                        onBlur={inputOnBlurHandler}
                        className={styles.search_input}
                        placeholder='검색하고 싶은 키워드를 입력하세요!'
                        value={inputVal}
                    />
                </ReponsiveMobile>
                {isVisibleClose ? <div onClick={removeValueOnClickHandler}><CloseIcon /></div> : null}
            </div>
        </div>
    );
}

export default SearchBarPresenter;
