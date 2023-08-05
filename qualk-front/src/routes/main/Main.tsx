import React, {useEffect, useState} from 'react';
import styles from 'stylesheets/main/Main.module.css';
import GlobalSearchBar from 'components/main/GlobalSearchBar';
import InfiniteScroll from 'components/main/InfiniteScroll';
import GlobalNavBar from 'components/main/GlobalNavBar';
import {ReactComponent as DuckHelpLogo} from 'assets/images/public/duck_01.svg';
import {ReactComponent as LinePath} from 'assets/images/main/linear_path.svg';
import LicenseCard from 'components/main/LicenseCard';
import {ReactComponent as BigDataImage} from 'assets/images/main/license/big_data.svg';
import GAIQImage from 'assets/images/main/license/google_analytics.png';
import TableauImage from 'assets/images/main/license/tableau.png';
import ADsPImage from 'assets/images/main/license/ADsP.png';
import SQLDImage from 'assets/images/main/license/sqld.png';
import ReactiveContents from 'components/main/ReactiveContents';

function Main(){
    return(
        <div className={styles.main_root}>
            <section className={styles.main_section}>
                <div className={styles.header_container}>
                    <GlobalNavBar />
                </div>
                <div className={styles.background_container}>
                    <div className={styles.search_container}>
                        <GlobalSearchBar/>
                    </div>
                    <div className={styles.scroll_container}>
                        <InfiniteScroll />
                    </div>
                </div>
            </section>
            <section className={styles.explain_section}>
                <div className={styles.deco_container}>
                    <div className={styles.left_box}>
                        <div className={styles.info_title_container}>
                            <span><b>자격증 준비,</b> 어디서부터 <br /> 시작해야할지 막막하다구요?</span>
                        </div>
                        <div className={styles.duck_graphic_container}>
                            <span>Help!</span>
                            <DuckHelpLogo />
                        </div>
                    </div>
                    <div className={styles.info_box}>
                        <div className={styles.border_box}>
                            <span><b>자격증이 중요한 건 알겠는데, <br /> 어떻게 공부를 시작 해야 할지 감이 안잡히나요?</b></span>
                            <br />
                            <br />
                            <span>그렇다면 Qualk과 함께 자격증 공부를 시작해보는 것은 어때요?</span>
                        </div>
                        <div className={styles.border_box}>
                            <span>자격증은 우리에게 <b>목표의식</b>을 높여줄 뿐 아니라 <br/> 새로운 분석 도구를 익히기 전, 구조적인 지식을 쌓을 수 있는 <br/> <b>튜토리얼과 같은 역할</b>을 한답니다!</span>
                        </div>
                        <div className={styles.border_box}>
                            <span>당신의 의지가 결과물로 도달할 수 있도록 <br /> Qualk이 옆에서 도와줄게요!</span>
                        </div>
                    </div>
                    <div className={styles.line_container}>
                        <LinePath />
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
                    <LicenseCard ImageComponent={<img src={GAIQImage} width="227px" height="124px" />} isUsed={true} />
                </div>
            </section>
            <section className={styles.contents_section}>
                <ReactiveContents />
            </section>
        </div>
    )
}

export default Main
