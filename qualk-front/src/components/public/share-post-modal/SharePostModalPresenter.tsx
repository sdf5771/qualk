import React, {ReactEventHandler} from 'react';
import styles from './SharePostModalPresenter.module.css';
import {ReactComponent as ModalCloseDefault} from 'assets/images/public/modal_close_default.svg';
import {ReactComponent as ModalCLoseActive} from 'assets/images/public/modal_close_hover.svg';
import SharePlatformElement from "./share-platform-element/SharePlatformElement";

type SharePostModalPresenterPropsType = {
    modalCloseOnClickHandler: ReactEventHandler,
    copyOnClickHandler: ReactEventHandler,
    urlPath:string,
}

function SharePostModalPresenter({modalCloseOnClickHandler, copyOnClickHandler, urlPath}: SharePostModalPresenterPropsType){
    return(
        <div className={styles.modal_root}>
            <div className={styles.modal_background}></div>
            <div className={styles.share_post_modal}>
                <div className={styles.modal_header}>
                    <span className={styles.modal_title}>공유하기</span>
                    <div onClick={modalCloseOnClickHandler} className={styles.modal_close_container}>
                        <ModalCloseDefault />
                    </div>
                </div>
                <div className={styles.modal_body}>
                    <div className={styles.url_container}>
                        <span className={styles.url_txt}>{urlPath}</span>
                        <span onClick={copyOnClickHandler} className={styles.copy_clipboard}>복사</span>
                    </div>
                    <div className={styles.new_line}></div>
                    <div className={styles.share_btn_container}>
                        <SharePlatformElement
                            icon="instagram"
                            platformName="Instagram"
                        />
                        <SharePlatformElement
                            icon="facebook"
                            platformName="Facebook"
                        />
                        <SharePlatformElement
                            icon="twitter"
                            platformName="Twitter"
                        />
                        <SharePlatformElement
                            icon="kakao"
                            platformName="카카오톡"
                        />
                        <SharePlatformElement
                            icon="mail"
                            platformName="이메일"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SharePostModalPresenter;
