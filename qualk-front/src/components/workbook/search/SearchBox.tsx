import React, { useEffect, useState } from 'react';
import styles from './SearchBox.module.css';
import GlobalSearchBar from 'components/main/GlobalSearchBar';
import { useLocation } from 'react-router-dom';

function SearchBox(){
    const location = useLocation();
    const [keyword, setKeyword] = useState('');
    useEffect(() => {
        const [searchStr, typeStr] = location.search.split('&')
        setKeyword(searchStr.split('=')[1])
    }, [location.search])
    return (
        <div className={styles.search_box_root}>
            <GlobalSearchBar initialValue={keyword} option={{searchBarWidth: 1420,useTitleLogo: false}} />
        </div>
    )
}

export default SearchBox;