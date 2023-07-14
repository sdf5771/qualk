import React, {ReactEventHandler, useEffect} from 'react';
import styles from './SharePlatformElement.module.css';
import {ReactComponent as InstagramIcon} from 'assets/images/public/Web-Icon44-instagram.svg';
import {ReactComponent as FacebookIcon} from 'assets/images/public/Web-Icon44-facebook.svg';
import {ReactComponent as TwitterIcon} from 'assets/images/public/Web-Icon44-twitter.svg';
import {ReactComponent as MailIcon} from 'assets/images/public/Web-Icon44-email.svg';
import {ReactComponent as KakaoIcon} from 'assets/images/public/Web-Icon44-kakao.svg';

type SharePlatformElementPropsType = {
    platformName: string,
    icon: "instagram" | "facebook" | "mail" | "kakao" | "twitter",
    onClickEvent?: ReactEventHandler,
}

function SharePlatformElement({platformName, icon, onClickEvent}: SharePlatformElementPropsType){
    let DefaultIcon = InstagramIcon;

    useEffect(() => {
        if(icon === 'kakao'){
            const script = document.createElement('script');
            script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js";
            script.integrity = "sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx";
            script.crossOrigin = "anonymous"
            script.async = true;
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            }
        }
    }, [])

    switch(icon){
        case "instagram":
            DefaultIcon = InstagramIcon
            break
        case "facebook" :
            DefaultIcon = FacebookIcon
            break
        case "mail" :
            DefaultIcon = MailIcon
            break
        case "kakao" :
            DefaultIcon = KakaoIcon
            break
        case "twitter" :
            DefaultIcon = TwitterIcon
            break
    }

    return(
        <div className={styles.platform_root} onClick={onClickEvent}>
            <div className={styles.icon_container}>
                <DefaultIcon />
            </div>
            <div className={styles.title_container}>
                <span>{platformName}</span>
            </div>
        </div>
    )
}

export default SharePlatformElement;
