import React, {useState, useEffect} from 'react';
import styles from './GlobalNavBar.module.css';
import SearchBarContainer from 'components/public/searchbar/SearchBarContainer';
import {ReactComponent as QualkHeaderLogo} from 'assets/images/workbook/listview/qualk_logo_122_40.svg';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hook/useAuth';
import UserProfile from 'components/public/userProfile/UserProfile';

function GlobalNavBar(){
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {getAccessToken} = useAuth();

    useEffect(() => {
        if(getAccessToken()){
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [getAccessToken])
    
    return(
        <div className={styles.nav_root}>
            <div className={styles.logo} onClick={() => {navigate('/')}}>
                <QualkHeaderLogo width='122px' height='40px' />
            </div>
            <div className={styles.menu_list}>
                <span onClick={() => navigate('/quiz/gaiq')}>Quiz</span>
            </div>
            <div className={styles.userinfo_box}>
                <SearchBarContainer />
                {isLoggedIn ? 
                    <UserProfile /> 
                    : <button onClick={() => navigate('/login')} className={styles.login_btn}>로그인</button>}    
            </div>
        </div>
    )
}

export default GlobalNavBar;