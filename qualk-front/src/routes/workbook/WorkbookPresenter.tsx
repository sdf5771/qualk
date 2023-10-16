import React, {ReactEventHandler} from 'react';
import styles from 'stylesheets/workbook/WorkbookPresenter.module.css';
import publicScrollbar from 'stylesheets/public/scrollbar.module.css';
import styled from 'styled-components';
import WorkbookListViewContainer from "../../components/workbook/listview/WorkbookListViewContainer";
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
import QuizTestNoContents from './quiz-test/QuizTestNoContents';
import PublicOkCancelModal from 'components/public/public-ok-cancel-modal/publicOkCancelModal';
import { Dispatch } from 'redux';
import { UseMutateFunction } from '@tanstack/react-query';
import { TcreateQuizTest } from 'queries/workbook/quiz-test/createQuizTest';
import { TdeleteQuizDataProps } from 'queries/workbook/quiz-test/deleteQuizData';
import SNB from 'components/workbook/left-nav-bar/SNB';
import GlobalNavBar from 'components/main/GlobalNavBar';
import QuizTestResult from './quiz-test/QuizTestResult';

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
    modalState: { 
        modalStateId: number, 
        navLocation?: string, 
        navigationState?: {
            prevPathName: string, 
            testId:string, 
            testIndex: number,
            totalIndex: number,
            testTime?: number,
        }, 
        mutateFunc?: UseMutateFunction },
    isToast?: boolean,
    toastType: 'check' | 'alert' | 'warning',
    toastMsg?: string,
    deleteQuiz: UseMutateFunction<any, unknown, TdeleteQuizDataProps, unknown>,
    createQuiz: UseMutateFunction<any, unknown, TcreateQuizTest, unknown>
}

function WorkbookPresenter({navigate, dispatch, location, modalState, isToast, toastType, toastMsg, deleteQuiz, createQuiz}: WorkbookPresenterPropsType){
    const workbookModalState = {
        0: null,
        1: <SharePostModalContainer />,
        2: <PublicOkCancelModal 
                title="이어서 문제를 풀어볼까요?" 
                description="이전에 문제를 풀던 기록이 남아 있어요! 이어서 진행하면 이전에 풀었던 문제부터 진행할 수 있어요!"
                okBtnTitle="처음부터 풀기" 
                cancelbtnTitle="이어서 풀기" 
                okBtnClickEventHandler={(event: React.MouseEvent<HTMLButtonElement>) => {                   
                    if(modalState && modalState.navLocation && modalState.navigationState){
                        let totalIndex = modalState.navigationState.totalIndex;

                        deleteQuiz({testId: modalState.navigationState.testId}, {onSuccess: (data) => {
                            if(data && data.ok && data.status === 204){
                                createQuiz(
                                    {type: 'gaiq', testNum: totalIndex}, 
                                    {onSuccess: (data: {testId: string, testIndex: number, time?: number}) => {
                                        if(data){
                                            let navState = {testIndex: data['testIndex'], testId: data['testId'], totalIndex: totalIndex, prevPathName: location.pathname, testTime: data['time']}
                                            let navLocation = totalIndex === 50 ? '/quiz/test/mockexam/start/' : `/quiz/test/gaiq/mockquiz?quiz=${data['testId']}`;
                                            navigate(navLocation, 
                                                {
                                                    state: navState
                                                }
                                            );
                                        }
                                        dispatch({type: "WorkbookModalClose"});
                                }})
                            }
                        }})
                    }
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
                    <GlobalNavBar />
                </div>
                <div className={`${styles.workbook_body} ${publicScrollbar.public_scroll}`}>
                    <div className={styles.left_side_container}>
                        <SNB />
                    </div>
                    <div className={styles.right_side_container}>
                        <Routes>
                            <Route path='/test/mockexam/start/' element={<MockTestStart />} />
                            <Route path='/test/mockexam/result/*' element={<MockTestResult />} />

                            <Route path='/test/gaiq' element={<QuizTestMain />} />
                            <Route path='/test/gaiq/*' element={<QuizTestView />} />
                            <Route path='/test/sqid' element={<QuizTestNoContents />} />
                            <Route path='/test/sqld' element={<QuizTestNoContents />} />
                            <Route path='/test/result/*' element={<QuizTestResult />} />

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
