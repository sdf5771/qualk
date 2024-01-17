import React, { useEffect, useState } from 'react';
import styles from './ReponsiveUserMenu.module.css';
import publicAnimations from 'stylesheets/public/animation.module.css';
import {ReactComponent as ModalClose} from 'assets/images/public/user_menu_modal_close.svg';
import {ReactComponent as DefaultUserProfileImg} from 'assets/images/public/userProfile/user_temp_profile_img.svg';
import {ReactComponent as DefaultUserLoggedOutProfileImg} from 'assets/images/public/userProfile/user_logged_out_profile.svg';
import {ReactComponent as SettingsLogo} from 'assets/images/public/userProfile/setting_logo.svg';
import {ReactComponent as LogoutLogo} from 'assets/images/public/userProfile/logout_logo.svg';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hook/useAuth';

type Tprops = {
    setActiveState: React.Dispatch<React.SetStateAction<boolean>>
}

function ResponsiveUserMenu({setActiveState}: Tprops){
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
        <div className={styles.user_menu_root}>
            <div className={styles.user_menu_background} onClick={() => setActiveState(false)}></div>
            <div className={`${styles.user_menu_body} ${publicAnimations.left_slide_modal}`}>
                <div className={styles.header_container}>
                    <div onClick={() => setActiveState(false)}>
                        <ModalClose width="16px" height="16px" />
                    </div>
                </div>
                {
                    isLoggedIn ? 
                    <div className={styles.user_profile_container}>
                        <div className={styles.user_profile}>
                            <DefaultUserProfileImg width="30px" height="30px" />
                            <div className={styles.user_name_container}>
                                <span>테스트</span>
                            </div>
                        </div>
                        <div className={styles.modify_profile}>
                            <span>프로필 수정</span>
                        </div>
                    </div>
                    : 
                    <div onClick={() => navigate('/login')} className={styles.user_profile_container}>
                        <div className={styles.user_profile}>
                            <DefaultUserLoggedOutProfileImg width="30px" height="30px" />
                            <div className={styles.user_login_container}>
                                <span>로그인 하기</span>
                            </div>
                        </div>
                    </div>

                }
                <div className={styles.new_line}></div>
                <div className={styles.li_container}>
                    <div className={styles.li_ele} onClick={() => navigate('/quiz/gaiq')}>
                        <span>Quiz</span>
                    </div>
                    <div className={styles.li_ele}>
                        <span>Wiki</span>
                    </div>
                    <div className={styles.li_ele}>
                        <span>Stack Overflow</span>
                    </div>
                </div>
                <div className={styles.new_line}></div>
                {isLoggedIn ? 
                <div className={styles.menu_control_list}>
                    <div className={styles.control_ele}>
                        <SettingsLogo width="24px" height="24px" />
                        <span>계정관리</span>
                    </div>
                    <div className={styles.control_ele}>
                        <LogoutLogo width="24px" height="24px" />
                        <span>로그아웃</span>
                    </div>
                </div>
                : null}
            </div>
        </div>
    )
}

export default ResponsiveUserMenu;