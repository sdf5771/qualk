import React, {useEffect, useState} from 'react';
import styles from 'stylesheets/main/Main.module.css';
import GlobalSearchBar from 'components/main/GlobalSearchBar';
import InfiniteScroll from 'components/main/InfiniteScroll';
import GlobalNavBar from 'components/main/GlobalNavBar';
import {ReactComponent as ArrowDown} from 'assets/images/main/arrow_down.svg';
import LicenseCard from 'components/main/LicenseCard';
import {ReactComponent as BigDataImage} from 'assets/images/main/license/big_data.svg';
import GAIQImage from 'assets/images/main/license/google_analytics.png';
import TableauImage from 'assets/images/main/license/tableau.png';
import ADsPImage from 'assets/images/main/license/ADsP.png';
import SQLDImage from 'assets/images/main/license/sqld.png';
import ReactiveContents from 'components/main/ReactiveContents';
import { useNavigate } from 'react-router-dom';
import ToastMsg from 'components/public/toast-msg/ToastMsg';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers/reducers';

function Main(){
    const navigate = useNavigate();
    const {isToast, toastType, toastMsg} = useSelector((state: RootState) => state.toastMsgReducer);
    return(
        <div className={styles.main_root}>
            <section className={styles.main_section}>
                <div className={styles.header_container}>
                    <GlobalNavBar />
                </div>
                <div className={styles.background_container}>
                    <div className={styles.search_container}>
                        <GlobalSearchBar option={{useTitleLogo: true}}/>
                    </div>
                    <div className={styles.scroll_container}>
                        <InfiniteScroll />
                    </div>
                </div>
            </section>
            <section className={styles.explain_section}>
                <div className={styles.deco_box}>
                    <div className={styles.header}>
                        <span>Q. 이런 고민 해보신적 있나요?</span>
                    </div>
                    <div className={styles.problem_container}>
                        <div className={styles.problem_box}>
                            <div className={styles.border_box}>
                                <span className={styles.title}>Problem 1</span>
                                <div className={styles.description_container}>
                                    <span>자격증이 중요한 건 알겠는데,</span>
                                    <span>어떻게 공부를 시작해야 할지 감이 안와요.</span>
                                </div>
                            </div>
                            <div className={styles.arrow_box}>
                                <ArrowDown />
                            </div>
                        </div>
                        <div className={styles.problem_box}>
                            <div className={styles.border_box}>
                                <span className={styles.title}>Problem 2</span>
                                <div className={styles.description_container}>
                                    <span>자격증을 취득해야 하는데,</span>
                                    <span>어떤것을 취득해야 할지 모르겠어요.</span>
                                </div>
                            </div>
                            <div className={styles.arrow_box}>
                                <ArrowDown />
                            </div>
                        </div>
                        <div className={styles.problem_box}>
                            <div className={styles.border_box}>
                                <span className={styles.title}>Problem 3</span>
                                <div className={styles.description_container}>
                                    <span>자격증 준비,</span>
                                    <span>어디서 부터 시작해야할까요?</span>
                                </div>
                            </div>
                            <div className={styles.arrow_box}>
                                <ArrowDown />
                            </div>
                        </div>
                    </div>
                    <div className={styles.solution_container}>
                        <div className={styles.solution_box}>
                            <span>Solution!</span>
                            <span>자격증 준비 부터 취득까지.</span>
                            <span>Qualk과 함께 시작해볼까요?</span>
                        </div>
                    </div>
                    <div className={styles.license_banner_box}>
                        <div className={styles.text_wrapper}>
                            <div className={styles.title_container}>
                                <span>자격증 준비 부터 취득까지.</span>
                                <span>Qualk과 함께 시작해볼까요?</span>
                            </div>
                            <div className={styles.description_container}>
                                <span>자격증은 우리에게 목표의식을 높여줄 뿐 아니라 새로운 분석 도구를 익히기 전,</span>
                                <span>구조적인 지식을 쌓을 수 있는 튜토리얼과 같은 역할을 한답니다!</span>
                                <span>당신의 의지가 결과물로 도달할 수 있도록 Qualk이 옆에서 도와줄게요!</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.license_section}>
                <div className={styles.title_container}>
                    <span>Qualk에서는 아래와 같은 시험들을 준비할 수 있어요!</span>
                </div>
                <div className={styles.license_list}>
                    <LicenseCard ImageComponent={<img src={SQLDImage} width="264px" height="179px" />} isUsed={false} />
                    <LicenseCard ImageComponent={<img src={TableauImage} width="173px" height="134px" />} isUsed={false} />
                    <LicenseCard ImageComponent={<img src={ADsPImage} width="216px" height="132px" />} isUsed={false} />
                    <LicenseCard ImageComponent={<BigDataImage />} isUsed={false} />
                    <LicenseCard onClickHandler={(event: React.MouseEvent<HTMLDivElement>) => {navigate('/openbook/gaiq')}} ImageComponent={<img src={GAIQImage} width="227px" height="124px" />} isUsed={true} />
                </div>
            </section>
            <section className={styles.contents_section}>
                <ReactiveContents />
            </section>
            {isToast && toastMsg && toastType ? <ToastMsg type={toastType} msgText={toastMsg} /> : null}
        </div>
    )
}

export default Main
