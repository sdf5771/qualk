import LoginForm from 'components/login/LoginForm';
import GlobalNavBar from 'components/main/GlobalNavBar';
import React from 'react';
import styles from 'stylesheets/login/LoginPage.module.css'
import bgImage from 'assets/images/login/login_bg_image.png';
import { RootState } from 'reducers/reducers';
import { useSelector } from 'react-redux';
import ToastMsg from 'components/public/toast-msg/ToastMsg';

function LoginPage(){
    const {isToast, toastType, toastMsg} = useSelector((state: RootState) => state.toastMsgReducer);
    return (
        <div className={styles.login_page_root}>
            <div className={styles.header_container}>
                <GlobalNavBar />
            </div>
            <div className={styles.body_container}>
                <section>
                    <LoginForm />
                </section>
                <section>
                    <img width={800} height={775} src={bgImage} />
                </section>
            </div>
            {isToast && toastMsg && toastType ? <ToastMsg type={toastType} msgText={toastMsg} /> : null}
        </div>
    )
}

export default LoginPage;