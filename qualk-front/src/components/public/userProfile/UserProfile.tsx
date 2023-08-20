import React, {useState} from 'react';
import styles from './UserProfile.module.css';
import publicAnimation from 'stylesheets/public/animation.module.css';
import {ReactComponent as DefaultProfileImg} from 'assets/images/public/userProfile/user_temp_profile_img.svg';
import {ReactComponent as UserProfileLogo} from 'assets/images/public/userProfile/user_profile_logo.svg';
import {ReactComponent as SettingLogo} from 'assets/images/public/userProfile/setting_logo.svg';
import {ReactComponent as LogoutLogo} from 'assets/images/public/userProfile/logout_logo.svg';
import useAuth from 'hook/useAuth';
import { useDispatch } from 'react-redux';

function UserProfile(){
    const {logOut} = useAuth();
    const [isActive, setIsActive] = useState(false);
    const dispatch = useDispatch();

    const userProfileClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        dispatch({type: 'toast open', toastType: 'alert', toastMsg: '아직 준비중인 기능이에요.'})
    }

    const accountSettingClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        dispatch({type: 'toast open', toastType: 'alert', toastMsg: '아직 준비중인 기능이에요.'})
    }

    return (
        <div className={styles.user_profile_root}>
            <div onClick={() => setIsActive(!isActive)} className={`${styles.profile_img_container} ${publicAnimation.fade_in}`}>
                <DefaultProfileImg />
            </div>
            {isActive ? 
                <div className={styles.list_box}>
                    <div onClick={userProfileClickHandler} className={styles.li_element}>
                        <UserProfileLogo />
                        <span>프로필</span>
                    </div>
                    <div onClick={accountSettingClickHandler} className={styles.li_element}>
                        <SettingLogo />
                        <span>계정관리</span>
                    </div>

                    <div className={styles.new_line} />
                    
                    <div onClick={() => logOut()} className={styles.li_element}>
                        <LogoutLogo />
                        <span>로그아웃</span>
                    </div>
                </div>
            : null}
        </div>
    )
}

export default UserProfile;