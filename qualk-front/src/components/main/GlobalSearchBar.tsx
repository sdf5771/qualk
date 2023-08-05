import React, {useState} from 'react';
import styles from './GlobalSearchBar.module.css';
import {ReactComponent as SearchLogo} from 'assets/images/workbook/searchbar/search_icon.svg';
import {ReactComponent as QualkMainTitle} from 'assets/images/main/qualk_main_title.svg';

function GlobalSearchBar(){
    const [searchInput, setSearchInput] = useState('');

    const inputOnChangehandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    }

    return(
        <div className={styles.search_root}>
            <div className={styles.title_container}>
                <QualkMainTitle />
            </div>
            <div className={styles.search_box}>
                <SearchLogo width="32px" height="32px" />
                <input 
                    onChange={inputOnChangehandler} 
                    value={searchInput} 
                    placeholder='오늘은 어떤 것을 공부해 볼까요? 검색하고 싶은 단어나 태그를 입력해보세요!'/>
                <button>검색하기</button>
            </div>
            <div className={styles.keyword_container}>
                <span>#추천태그</span>
                <div className={styles.keyword_box}>

                </div>
            </div>
        </div>
    )
}

export default GlobalSearchBar;