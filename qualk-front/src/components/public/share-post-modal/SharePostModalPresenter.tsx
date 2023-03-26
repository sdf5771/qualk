import React, {ReactEventHandler, Dispatch} from 'react';
import styles from './SharePostModalPresenter.module.css';
import publicAnimations from 'stylesheets/public/animation.module.css';
import {ReactComponent as ModalCloseDefault} from 'assets/images/public/modal_close_default.svg';
import {ReactComponent as ModalCLoseActive} from 'assets/images/public/modal_close_hover.svg';
import SharePlatformElement from "./share-platform-element/SharePlatformElement";
import socialShare from 'javascripts/socialShare';
import {actionType} from "reducers/public/toastMsgReducer";

type SharePostModalPresenterPropsType = {
    dispatch: Dispatch<actionType>,
    modalCloseOnClickHandler: ReactEventHandler,
    copyOnClickHandler: ReactEventHandler,
    urlPath:string,
}

function SharePostModalPresenter({dispatch, modalCloseOnClickHandler, copyOnClickHandler, urlPath}: SharePostModalPresenterPropsType){


    return(
        <div className={`${styles.modal_root} ${publicAnimations.fade_in}`}>
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
                            onClickEvent={() => {
                                dispatch({type: 'toast open', toastMsg: '아직 준비중인 기능이에요.'})
                                // socialShare('instagram');
                            }}
                        />
                        <SharePlatformElement
                            icon="facebook"
                            platformName="Facebook"
                            onClickEvent={() => {
                                socialShare('facebook');
                            }}
                        />
                        <SharePlatformElement
                            icon="twitter"
                            platformName="Twitter"
                            onClickEvent={() => {
                                socialShare('twitter');
                            }}
                        />
                        <SharePlatformElement
                            icon="kakao"
                            platformName="카카오톡"
                            onClickEvent={() => {
                                socialShare('kakao');
                            }}
                        />
                        <SharePlatformElement
                            icon="mail"
                            platformName="이메일"
                            onClickEvent={() => {
                                dispatch({type: 'toast open', toastMsg: '아직 준비중인 기능이에요.'})
                                // socialShare('email');
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SharePostModalPresenter;
