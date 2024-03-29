import React, {useState, useEffect} from 'react';
import styles from './GlobalSearchBar.module.css';
import {ReactComponent as SearchLogo} from 'assets/images/workbook/searchbar/search_icon.svg';
import {ReactComponent as QualkMainTitle} from 'assets/images/main/qualk_main_title02.svg';
import useSeachKeyword from 'hook/useSeachKeyword';
import { useNavigate } from 'react-router-dom';
import {ReactComponent as KeywordLogo} from 'assets/images/main/keyword_logo.svg';

type Tprops = {
    initialValue?: string,
    option?: {
        searchBarWidth?: number | string,
        useTitleLogo?: boolean,
    }
}

function GlobalSearchBar({initialValue, option}: Tprops){
    const navigate = useNavigate();
    const {writeKeyword, getSeachKeyword} = useSeachKeyword();
    const [searchInput, setSearchInput] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [isActiveKeywordBox, setIsActiveKeywordBox] = useState(false);

    useEffect(() => {
        if(initialValue && initialValue !== ''){
            setSearchInput(initialValue)
        }
    }, [initialValue])

    useEffect(() => {
        setKeywords(getSeachKeyword);
    }, [localStorage.getItem('searchKeyword')])

    const inputOnChangehandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    }

    const searchRequest = () => {
        if(searchInput !== ''){
            writeKeyword({keyword: searchInput});
            setSearchInput('');
            navigate(`/openbook/search?keyword=${searchInput}&type=all`);
        }
    }

    const seachBtnOnClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        searchRequest()
    }

    const onKeyUpHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.code === 'Enter'){
            searchRequest()
        }
    }

    return(
        <div className={styles.search_root}>
            {option?.useTitleLogo ?
                <div className={styles.title_container}>
                    <QualkMainTitle />
                </div>
            : null}
            <div style={{width: option?.searchBarWidth}} className={`${styles.search_box} ${isActiveKeywordBox ? styles.active : ''}`}>
                <div className={styles.search_area}>
                    <SearchLogo width="24px" height="24px" />
                    <input 
                        onFocus={() => {
                            setIsActiveKeywordBox(true);
                        }}
                        onBlur={() => {
                            setTimeout(() => {
                                setIsActiveKeywordBox(false);
                            }, 100)
                        }}
                        onChange={inputOnChangehandler} 
                        onKeyUp={onKeyUpHandler}
                        value={searchInput} 
                        placeholder='오늘은 어떤 것을 공부해 볼까요? 검색하고 싶은 단어나 태그를 입력해보세요!'/>
                    {/* <button onClick={seachBtnOnClickHandler}>검색하기</button> */}
                </div>
                <div className={`${styles.keyword_container} ${isActiveKeywordBox ? styles.active : ''}`}>
                    {keywords ? keywords.map((data:string, index:number) => {
                        return <div key={index + 'data'} className={styles.keyword_box}>
                            <div>
                                <KeywordLogo />
                            </div>
                            <span onClick={() => setSearchInput(data)}>#{data}</span>
                        </div>
                    }) : null}
                </div>
            </div>
        </div>
    )
}

export default GlobalSearchBar;