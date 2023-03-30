import React, {useEffect, useRef} from 'react';
import styles from 'components/public/toast-msg/ToastMsg.module.css';
import publicStyles from 'stylesheets/public/animation.module.css';
import {ReactComponent as CheckIcon} from 'assets/images/public/check_icon.svg';
import {ReactComponent as AlertIcon} from 'assets/images/public/alert_icon.svg';
import {ReactComponent as WarningIcon} from 'assets/images/public/warning_icon.svg';
import {useDispatch} from "react-redux";

type ToastMsgPropsType = {
    type: 'check' | 'alert' | 'warning',
    msgText: string,
}

function ToastMsg({type, msgText}: ToastMsgPropsType){
    const dispatch = useDispatch();
    const toastRef = useRef<HTMLDivElement>(null);
    let toastIcon;
    let toastTypeClass;

    if (type === 'check'){
        toastIcon = <CheckIcon />
        toastTypeClass = styles.check;
    } else if(type === 'alert'){
        toastIcon = <AlertIcon />
        toastTypeClass = styles.alert;
    } else if(type === 'warning'){
        toastIcon = <WarningIcon />
        toastTypeClass = styles.warning;
    }

    useEffect(() => {
        if(toastRef && toastRef.current){
            const currentRef = toastRef.current;
            currentRef.animate({
                bottom:['50px', '100px']
            },{
                duration: 150,
                easing: "ease-out",
                iterations: 1,
                fill: "both"
            });
        }
    }, [])

    setTimeout(() => {
        if(toastRef && toastRef.current){
            const currentRef = toastRef.current;
            currentRef.animate({
                opacity: [1, 0]
            },{
                duration: 150,
                easing: "ease-out",
                iterations: 1,
                fill: "both"
            });
        }
    }, 4900)

    setTimeout(() => {
        dispatch({type: 'toast close', toastType: '', toastMsg: ''})
    }, 5000)

    return(
        <div ref={toastRef} className={`${styles.toast_msg_root} ${publicStyles.fade_in} ${toastTypeClass}`}>
            <div className={styles.toast_icon_container}>
                {toastIcon}
            </div>
            <div className={styles.toast_text_container}>
                <span>{msgText}</span>
            </div>
        </div>
    )
}

export default ToastMsg;
