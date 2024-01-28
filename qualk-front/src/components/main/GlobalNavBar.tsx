import React, {useState, useEffect} from 'react';
import styles from './GlobalNavBar.module.css';
import publicAnimations from 'stylesheets/public/animation.module.css';
import SearchBarContainer from 'components/public/searchbar/SearchBarContainer';
import {ReactComponent as QualkHeaderLogo} from 'assets/images/workbook/listview/qualk_logo_122_40.svg';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hook/useAuth';
import UserProfile from 'components/public/userProfile/UserProfile';
import { ReponsiveMobile, ReponsivePC, ReponsiveTabletPC } from 'components/public/responsive-wrapper/ResponsiveWrapper';
import {ReactComponent as QualkTitleLogo} from 'assets/images/public/qualk_title_logo.svg';
import {ReactComponent as HamburgerBtn} from 'assets/images/public/hamburger_btn.svg';
import {ReactComponent as ResponsiveSearchBtn} from 'assets/images/public/responsive_search_btn.svg';
import ResponsiveUserMenu from 'components/public/responsive-user-menu/ResponsiveUserMenu';

function GlobalNavBar(){
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {isFreshToken} = useAuth();
    const [isActiveSearchBox, setIsActiveSearchBox] = useState(false);
    const [isActiveHamburger, setIsActiveHamburger] = useState(false);

    useEffect(() => {
        if(isFreshToken()){
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [])
    
    return(
        <>
            <ReponsivePC>
                <div className={styles.nav_root}>
                    <div className={styles.logo} onClick={() => {navigate('/')}}>
                        <QualkHeaderLogo width='122px' height='40px' />
                    </div>

                    <div className={styles.menu_list}>
                        <span onClick={() => navigate('/openbook/gaiq')}>Openbook</span>
                        <span onClick={() => navigate('/openbook/test/gaiq')}>Test</span>
                    </div>

                    <div className={styles.userinfo_box}>
                        <SearchBarContainer />
                        {isLoggedIn ? 
                            <UserProfile /> 
                        : <button onClick={() => navigate('/login')} className={styles.login_btn}>로그인</button>}     
                    </div>
                </div>
            </ReponsivePC>

            <ReponsiveTabletPC>
                <div className={styles.nav_root}>
                    <div className={styles.logo}>
                        <div className={styles.responsive_title_container}>
                            <div onClick={() => setIsActiveHamburger(true)}>
                                <HamburgerBtn width="24px" height="24px"/>
                            </div>
                            <div onClick={() => {navigate('/')}}>
                                <QualkTitleLogo width='80px' height='22px' />
                            </div>
                        </div>
                    </div>
                    <div className={styles.userinfo_box}>
                        <div className={styles.search_btn} onClick={() => setIsActiveSearchBox(prev => !prev)}>
                            <ResponsiveSearchBtn width="32px" height="32px" />
                        </div>
                    </div>
                </div>
                {isActiveSearchBox ? 
                    <div className={`${styles.search_area_box} ${publicAnimations.fade_and_slide}`}>
                        <SearchBarContainer />
                    </div>
                : null}
                {isActiveHamburger ? 
                    <ResponsiveUserMenu setActiveState={setIsActiveHamburger} />
                : null}
            </ReponsiveTabletPC>

            <ReponsiveMobile>
                <div className={styles.nav_root}>
                    <div className={styles.logo}>
                        <div className={styles.responsive_title_container}>
                            <div onClick={() => setIsActiveHamburger(true)}>
                                <HamburgerBtn width="24px" height="24px"/>
                            </div>
                            <div onClick={() => {navigate('/')}}>
                                <QualkTitleLogo width='80px' height='22px' />
                            </div>
                        </div>
                    </div>
                    <div className={styles.userinfo_box}>
                        <div className={styles.search_btn} onClick={() => setIsActiveSearchBox(prev => !prev)}>
                            <ResponsiveSearchBtn width="32px" height="32px" />
                        </div>
                    </div>
                    {isActiveSearchBox ? 
                        <div className={`${styles.search_area_box} ${publicAnimations.fade_and_slide}`}>
                            <SearchBarContainer />
                        </div>
                    : null}
                    {isActiveHamburger ? 
                        <ResponsiveUserMenu setActiveState={setIsActiveHamburger} />
                    : null}
                </div>
            </ReponsiveMobile>
        </>
    )
}

export default GlobalNavBar;