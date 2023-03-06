import React, {ReactEventHandler, useEffect, useState} from 'react';
import styles from './SharePlatformElement.module.css';
import {ReactComponent as InstagramIcon} from 'assets/images/public/instagram_icon.svg';
import {ReactComponent as InstagramIconActive} from 'assets/images/public/instagram_icon_active.svg';
import {ReactComponent as FacebookIcon} from 'assets/images/public/facebook_icon.svg';
import {ReactComponent as FacebookIconActive} from 'assets/images/public/facebook_icon_active.svg';
import {ReactComponent as TwitterIcon} from 'assets/images/public/twitter_icon.svg';
import {ReactComponent as TwitterIconActive} from 'assets/images/public/twitter_icon_active.svg';
import {ReactComponent as MailIcon} from 'assets/images/public/mail_icon.svg';
import {ReactComponent as MailIconActive} from 'assets/images/public/mail_icon_active.svg';
import {ReactComponent as KakaoIcon} from 'assets/images/public/kakao_icon.svg';
import {ReactComponent as KakaoIconActive} from 'assets/images/public/kakao_icon_active.svg';

type SharePlatformElementPropsType = {
    platformName: string,
    icon: "instagram" | "facebook" | "mail" | "kakao" | "twitter",
    onClickEvent?: ReactEventHandler,
}

function SharePlatformElement({platformName, icon, onClickEvent}: SharePlatformElementPropsType){
    const [isHover, setIsHover] = useState(false);
    let DefaultIcon = InstagramIcon;
    let ActiveIcon = InstagramIconActive;

    switch(icon){
        case "instagram":
            DefaultIcon = InstagramIcon
            ActiveIcon = InstagramIconActive;
            break
        case "facebook" :
            DefaultIcon = FacebookIcon
            ActiveIcon = FacebookIconActive;
            break
        case "mail" :
            DefaultIcon = MailIcon
            ActiveIcon = MailIconActive;
            break
        case "kakao" :
            DefaultIcon = KakaoIcon
            ActiveIcon = KakaoIconActive;
            break
        case "twitter" :
            DefaultIcon = TwitterIcon
            ActiveIcon = TwitterIconActive;
            break
    }

    const onMouseOverHandler = (event: React.MouseEvent) => {
        setIsHover(true)
    }

    const onMouseOutHandler = (event: React.MouseEvent) => {
        setIsHover(false)
    }

    return(
        <div onMouseOver={onMouseOverHandler} onMouseOut={onMouseOutHandler} className={styles.platform_root} onClick={onClickEvent}>
            <div className={styles.icon_container}>
                {isHover ? <ActiveIcon /> : <DefaultIcon />}
            </div>
            <div className={styles.title_container}>
                <span>{platformName}</span>
            </div>
        </div>
    )
}

export default SharePlatformElement;
