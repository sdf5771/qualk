import React, {ReactEventHandler} from 'react';
import styles from 'stylesheets/workbook/WorkbookPresenter.module.css';
import publicScrollbar from 'stylesheets/public/scrollbar.module.css';
import styled from 'styled-components';
import SideBarContainer from "../../components/workbook/sidebarmenu/SideBarMenuContainer";
import SearchBarContainer from "../../components/public/searchbar/SearchBarContainer";
import WorkbookListViewContainer from "../../components/workbook/listview/WorkbookListViewContainer";
import {ReactComponent as QualkHeaderLogo} from 'assets/images/workbook/listview/qualk_logo_122_40.svg';
import SharePostModalContainer from 'components/public/share-post-modal/SharePostModalContainer';
import {Location, NavigateFunction, Route, Routes} from "react-router-dom";
import WorkbookDetailContainer from "components/workbook/workbook-detail/WorkbookDetailContainer";
import SEOMetaTag from "components/public/metaTag/SEOMetaTag";
import ToastMsg from "components/public/toast-msg/ToastMsg";
import QuizSearch from "./search/QuizSearch";
import QuizTestMain from "./quiz-test/QuizTestMain";
import QuizTestView from './quiz-test/QuizTestView';
import MockTestStart from './quiz-test/MockTestStart';
import MockTestResult from './quiz-test/MockTestResult';
import PublicOkCancelModal from 'components/public/public-ok-cancel-modal/publicOkCancelModal';
import { Dispatch } from 'redux';
import { MutateFunction, Mutation, MutationFunction, UseMutateFunction } from '@tanstack/react-query';
import { TcreateQuizTest } from 'queries/workbook/quiz-test/createQuizTest';
import { TdeleteQuizDataProps } from 'queries/workbook/quiz-test/deleteQuizData';

const LogoTitle = styled.span`
    color: #ff9300;
    font-size: 2.25rem;
    font-family: bc-alphapipe, sans-serif;
    font-weight: bold;
    letter-spacing: -1.44px;
`;

type WorkbookPresenterPropsType = {
    location: Location,
    navigate: NavigateFunction,
    dispatch: Dispatch
    headerLogoOnClickHandler: ReactEventHandler,
    modalState: { modalStateId: number, navLocation?: string, navigationState?: string, mutateFunc?: UseMutateFunction },
    isToast?: boolean,
    toastType: 'check' | 'alert' | 'warning',
    toastMsg?: string,
    deleteQuiz: UseMutateFunction<any, unknown, TdeleteQuizDataProps, unknown>,
    createQuiz: UseMutateFunction<any, unknown, TcreateQuizTest, unknown>
}

function WorkbookPresenter({navigate, dispatch, location, headerLogoOnClickHandler, modalState, isToast, toastType, toastMsg, deleteQuiz, createQuiz}: WorkbookPresenterPropsType){
    const workbookModalState = {
        0: null,
        1: <SharePostModalContainer />,
        2: <PublicOkCancelModal 
                title="이어서 문제를 풀어볼까요?" 
                description="이전에 문제를 풀던 기록이 남아 있어요! 이어서 진행하면 이전에 풀었던 문제부터 진행할 수 있어요!"
                okBtnTitle="처음부터 풀기" 
                cancelbtnTitle="이어서 풀기" 
                okBtnClickEventHandler={(event: React.MouseEvent<HTMLButtonElement>) => {
                    // if(modalState && modalState.navLocation && modalState.navigationState){
                    //     deleteQuiz({testId: modalState.navigationState.testId})
                    //     modalState.mutateFunc(
                    //         {type: 'gaiq', testName: 'exam', userId: 'TestUser'}, 
                    //         {onSuccess: (data: {testId: string, testindex: number}) => {
                    //             if(data){
                    //                 let navState = {testIndex: data['testindex'], testId: data['testId'], totalIndex: modalState.navigationState ? modalState.navigationState['totalIndex'] : 10 , prevPathName: location.pathname}
                    //                 let navLocation = `/quiz/test/gaiq/mockquiz?quiz=${data['testId']}`;
                    //                 navigate(navLocation, 
                    //                     {
                    //                         state: navState
                    //                     }
                    //                 );
                    //             }
                    //         }})

                    //     dispatch({type: "WorkbookModalClose"});
                    // }
                }} 
                cancelBtnClickEventHandler={(event: React.MouseEvent<HTMLButtonElement>) => {
                    if(modalState && modalState.navLocation && modalState.navigationState){
                        navigate(modalState.navLocation, 
                            {
                                state: modalState.navigationState
                            }
                        );
                        dispatch({type: "WorkbookModalClose"});
                    }
                }} 
                closeBtnClickEventHandler={(event: React.MouseEvent<HTMLDivElement>) => {
                    dispatch({type: "WorkbookModalClose"});
                }}
                option={{
                    okBtnColor: "default",
                    cancelBtnColor: "yellow"
                }}
                />,
    }

    return(
        <>
            <SEOMetaTag
                title="Qualk"
                keywords="GAIQ, SQLD, SQID, Data Analytics, Google Analytics, Google, 구글 애널리틱스, 구글, 문제집, 문제"
                description="Qualk Workbook"
                url={document.URL}
                imgSrc="https://qualk.co.kr/logo512.png"
            />
            <div className={styles.workbook_main}>
                <div className={styles.workbook_header_container}>
                    <div className={styles.workbook_header}>
                        <div onClick={headerLogoOnClickHandler} className={styles.logo_container}>
                            <QualkHeaderLogo width="122px" height="40px"/>
                        </div>
                        <SearchBarContainer />
                    </div>
                </div>
                <div className={`${styles.workbook_body} ${publicScrollbar.public_scroll}`}>
                    <div className={styles.left_side_container}>
                        <SideBarContainer />
                    </div>
                    <div className={styles.right_side_container}>
                        <Routes>
                            <Route path='/test/mockexam/start/' element={<MockTestStart />} />
                            <Route path='/test/mockexam/result/*' element={<MockTestResult />} />
                            <Route path='/test/:id' element={<QuizTestMain />} />
                            <Route path='/test/:id/*' element={<QuizTestView />} />
                            <Route path='/search' element={<QuizSearch />} />
                            <Route path='/:id/*' element={<WorkbookDetailContainer />} />
                            <Route path='/:id' element={<WorkbookListViewContainer />} />
                        </Routes>
                    </div>
                </div>
                {modalState.modalStateId === 1 ? workbookModalState['1'] : workbookModalState['0']}
                {modalState.modalStateId === 2 ? workbookModalState['2'] : workbookModalState['0']}
                {isToast && toastMsg && toastType ? <ToastMsg type={toastType} msgText={toastMsg} /> : null}
            </div>
        </>
    );
}

export default WorkbookPresenter;
