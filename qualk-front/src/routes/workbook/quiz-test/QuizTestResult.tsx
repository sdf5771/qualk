import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from 'stylesheets/workbook/quiz-test/QuizTestResult.module.css';
import PublicImageBtnContainer from 'components/public/public-image-btn/PublicImageBtnContainer';
import {ReactComponent as ArrowLeftIconDefault} from "assets/images/public/arrow_left_icon.svg";
import {ReactComponent as ArrowLeftIconHover} from "assets/images/public/arrow_left_icon_hover.svg";
import QuizSelectShortcutElement from 'components/workbook/quiz-test/QuizSelectShortcutElement';
import LatestHistory from 'components/workbook/quiz-test/LatestHistory';
import WrongTestChart from 'components/workbook/quiz-test/WrongTestChart';
import { useMutation } from '@tanstack/react-query';
import createQuizTest from 'queries/workbook/quiz-test/createQuizTest';
import { useDispatch } from 'react-redux';

function QuizTestResult(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { mutate } = useMutation(createQuizTest);
    const reTestStartClickHandler = (event: React.MouseEvent<HTMLSpanElement>) => {
        // mutate(
        //     {type: 'gaiq', testNum: 50}, 
        //     {onSuccess: (data: {testId: string, testIndex: number}) => {
        //         if(data){
        //             let navState = {testIndex: data['testIndex'], testId: data['testId'], totalIndex: 50, prevPathName: location.pathname}
        //             let navLocation = `/quiz/test/gaiq/mockexam?quiz=${data['testId']}`;
        //             if(data.testIndex !== 1){
        //                 dispatch({type: "okCancelModalOpen", navLocation: navLocation ,navigationState: navState, mutateFunc: mutate})
        //             } else {
        //                 navigate(`/quiz/test/mockexam/start/`, 
        //                 {
        //                     state: navState
        //                 }
        //                 );
        //             }
        //         }
        //     }})
    }


    return (
        <div className={styles.quiz_result_root}>
            <div className={styles.quiz_result_header}>
                <PublicImageBtnContainer
                    btnText="목록으로"
                    options={{border: false}}
                    logoIcon={{
                        default: <ArrowLeftIconDefault />,
                        hover: <ArrowLeftIconHover />,
                    }}
                    btnClickEventHandler={(event: React.MouseEvent)=>{
                        navigate(`/quiz/test/gaiq`)
                    }}
                />
                <span className={styles.re_test} onClick={reTestStartClickHandler}>다시 응시하기</span>
            </div>
            <div className={styles.result_container}>

                <div className={styles.result_section}>
                    <div className={styles.header}>
                        <span>GAIQ 10문제 퀴즈 결과</span>
                    </div>
                    <div className={styles.result_section_body}>
                        <WrongTestChart 
                        userCorrected={8}
                        totalIndex={10}
                        correctPercent={81}
                        command={`GAIQ 10문제 퀴즈 결과
                        총 10문제 중 8문제를 맞추셨어요!`}
                        isPass={true}
                        isPerfect={false}
                        isHalfSize={true}
                        />
                        <LatestHistory />
                    </div>
                </div>

                <div className={styles.another_test_section}>
                    <div className={styles.header}>
                        <span>다른 퀴즈도 도전해 볼까요?</span>
                    </div>
                    <div className={styles.test_element_container}>
                        <QuizSelectShortcutElement 
                        title={'처음은 간단하게 시작해볼까요?'}
                        description={'랜덤으로 출제되는 10문제 퀴즈로 워밍업해보세요!'}
                        quizType={10}
                        onClickHandler={() => {
                            mutate(
                                {type: 'gaiq', testNum: 10}, 
                                {onSuccess: (data: {testId: string, testIndex: number}) => {
                                    if(data){
                                        let navState = {testIndex: data['testIndex'], testId: data['testId'], totalIndex: 10, prevPathName: location.pathname}
                                        let navLocation = `/quiz/test/gaiq/mockquiz?quiz=${data['testId']}`;
                                        if(data.testIndex !== 1){
                                            dispatch({type: "okCancelModalOpen", navLocation: navLocation ,navigationState: navState, mutateFunc: mutate})
                                        } else {
                                            navigate(navLocation, 
                                            {
                                                state: navState
                                            }
                                            );
                                        }
                                    }
                                }, onError: () => {
                                    mutate(
                                        {type: 'gaiq', testNum: 10}, 
                                        {onSuccess: (data: {testId: string, testIndex: number}) => {
                                            if(data){
                                                let navState = {testIndex: data['testIndex'], testId: data['testId'], totalIndex: 10, prevPathName: location.pathname}
                                                let navLocation = `/quiz/test/gaiq/mockquiz?quiz=${data['testId']}`;
                                                if(data.testIndex !== 1){
                                                    dispatch({type: "okCancelModalOpen", navLocation: navLocation ,navigationState: navState, mutateFunc: mutate})
                                                } else {
                                                    navigate(navLocation, 
                                                    {
                                                        state: navState
                                                    }
                                                    );
                                                }
                                            }
                                        }})
                                }})
                        }}
                        />
                        <QuizSelectShortcutElement 
                        title={'이제 할만하죠?'}
                        description={'그렇다면 랜덤으로 출제되는 20문제 퀴즈로 실력을 좀 더 높여볼까요?'}
                        quizType={20}
                        onClickHandler={() => {
                            mutate(
                                {type: 'gaiq', testNum: 20}, 
                                {onSuccess: (data: {testId: string, testIndex: number}) => {
                                    if(data){
                                        let navState = {testIndex: data['testIndex'], testId: data['testId'], totalIndex: 20, prevPathName: location.pathname}
                                        let navLocation = `/quiz/test/gaiq/mockquiz?quiz=${data['testId']}`;
                                        if(data.testIndex !== 1){
                                            dispatch({type: "okCancelModalOpen", navLocation: navLocation ,navigationState: navState, mutateFunc: mutate})
                                        } else {
                                            navigate(navLocation, 
                                            {
                                                state: navState
                                            }
                                            );
                                        }
                                    }
                                }, onError: () => {
                                    mutate(
                                        {type: 'gaiq', testNum: 20}, 
                                        {onSuccess: (data: {testId: string, testIndex: number}) => {
                                            if(data){
                                                let navState = {testIndex: data['testIndex'], testId: data['testId'], totalIndex: 20, prevPathName: location.pathname}
                                                let navLocation = `/quiz/test/gaiq/mockquiz?quiz=${data['testId']}`;
                                                if(data.testIndex !== 1){
                                                    dispatch({type: "okCancelModalOpen", navLocation: navLocation ,navigationState: navState, mutateFunc: mutate})
                                                } else {
                                                    navigate(navLocation, 
                                                    {
                                                        state: navState
                                                    }
                                                    );
                                                }
                                            }
                                        }})
                                }})
                        }}
                        />
                        <QuizSelectShortcutElement 
                        title={'테스트 폼 미쳤다!'}
                        description={'랜덤으로 출제되는 30문제 퀴즈를 통한 GAIQ 테스트 완벽 준비!'}
                        quizType={30}
                        onClickHandler={() => {
                            mutate(
                                {type: 'gaiq', testNum: 30}, 
                                {onSuccess: (data: {testId: string, testIndex: number}) => {
                                    if(data){
                                        let navState = {testIndex: data['testIndex'], testId: data['testId'], totalIndex: 30, prevPathName: location.pathname}
                                        let navLocation = `/quiz/test/gaiq/mockquiz?quiz=${data['testId']}`;
                                        if(data.testIndex !== 1){
                                            dispatch({type: "okCancelModalOpen", navLocation: navLocation ,navigationState: navState, mutateFunc: mutate})
                                        } else {
                                            navigate(navLocation, 
                                            {
                                                state: navState
                                            }
                                            );
                                        }
                                    }
                                }, onError: () => {
                                    mutate(
                                        {type: 'gaiq', testNum: 30}, 
                                        {onSuccess: (data: {testId: string, testIndex: number}) => {
                                            if(data){
                                                let navState = {testIndex: data['testIndex'], testId: data['testId'], totalIndex: 30, prevPathName: location.pathname}
                                                let navLocation = `/quiz/test/gaiq/mockquiz?quiz=${data['testId']}`;
                                                if(data.testIndex !== 1){
                                                    dispatch({type: "okCancelModalOpen", navLocation: navLocation ,navigationState: navState, mutateFunc: mutate})
                                                } else {
                                                    navigate(navLocation, 
                                                    {
                                                        state: navState
                                                    }
                                                    );
                                                }
                                            }
                                        }})
                                }})
                        }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizTestResult;