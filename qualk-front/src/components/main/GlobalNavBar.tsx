import React from 'react';
import styles from './GlobalNavBar.module.css';
import SearchBarContainer from 'components/public/searchbar/SearchBarContainer';
import {ReactComponent as QualkHeaderLogo} from 'assets/images/workbook/listview/qualk_logo_122_40.svg';
import { useNavigate } from 'react-router-dom';

function GlobalNavBar(){
    const navigate = useNavigate();
    
    return(
        <div className={styles.nav_root}>
            <div className={styles.logo} onClick={() => {navigate('/')}}>
                <QualkHeaderLogo width='122px' height='40px' />
            </div>
            <div className={styles.menu_list}>
                <span onClick={() => navigate('/quiz/gaiq')}>Quiz</span>
            </div>
            <SearchBarContainer />
        </div>
    )
}

export default GlobalNavBar;