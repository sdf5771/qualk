import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from 'stylesheets/workbook/quiz-test/QuizTestResult.module.css';
import PublicImageBtnContainer from 'components/public/public-image-btn/PublicImageBtnContainer';
import {ReactComponent as ArrowLeftIconDefault} from "assets/images/public/arrow_left_icon.svg";
import {ReactComponent as ArrowLeftIconHover} from "assets/images/public/arrow_left_icon_hover.svg";
import QuizSelectShortcutElement from 'components/workbook/quiz-test/QuizSelectShortcutElement';
import LatestHistory from 'components/workbook/quiz-test/LatestHistory';
import WrongTestChart from 'components/workbook/quiz-test/WrongTestChart';
import { useMutation, useQuery } from '@tanstack/react-query';
import createQuizTest from 'queries/workbook/quiz-test/createQuizTest';
import { useDispatch } from 'react-redux';
import getEasyQuizResult from 'queries/workbook/quiz-test/getEasyQuizResult';

type TQuizResultData = {
    "testId": string,
    "correct": number,
    "questionNum": number,
    "wrongNum": number,
    "correctPercent": number,
    "excorrect": number | null,
    "exquestionNum": number | null,
    "ex_createdate": string | null
}

function QuizTestResult(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [testId, setTestId] = useState<string | null>(null);
    const { isLoading, isError, data: quizResult, error} = useQuery(['test-id', testId], () => getEasyQuizResult({testId: testId ? testId : ''}), {staleTime: 100000})
    const { mutate } = useMutation(createQuizTest);
    const reTestStartClickHandler = (event: React.MouseEvent<HTMLSpanElement>) => {
        mutate(
            {type: 'gaiq', testNum: quizResult ? quizResult['questionNum'] : 0}, 
            {onSuccess: (data: {testId: string, testIndex: number}) => {
                if(data){
                    let navState = {testIndex: data['testIndex'], testId: data['testId'], totalIndex: quizResult ? quizResult['qustionNum'] : 0, prevPathName: location.pathname}
                    let navLocation = `/openbook/test/gaiq/mockquiz?quiz=${data['testId']}`;
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
    }

    useEffect(() => {
        // URL 내 testId state에 할당
        setTestId(location.search.split('=')[1])
    }, [location])

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
                        navigate(`/openbook/test/gaiq`)
                    }}
                />
                <span className={styles.re_test} onClick={reTestStartClickHandler}>다시 응시하기</span>
            </div>
            <div className={styles.result_container}>

                <div className={styles.result_section}>
                    <div className={styles.header}>
                        <span>GAIQ {quizResult ? quizResult['questionNum'] : 0}문제 퀴즈 결과</span>
                    </div>
                    <div className={styles.result_section_body}>
                        <WrongTestChart 
                        userCorrected={quizResult ? quizResult['correct'] : 0}
                        totalIndex={quizResult ? quizResult['questionNum'] : 0}
                        correctPercent={quizResult ? quizResult['correctPercent'] : 0}
                        command={`GAIQ ${quizResult ? quizResult['questionNum'] : 0}문제 퀴즈 결과
                        총 ${quizResult ? quizResult['questionNum'] : 0}문제 중 ${quizResult ? quizResult['correct'] : 0}문제를 맞추셨어요!`}
                        isPass={true}
                        isPerfect={false}
                        isHalfSize={true}
                        />
                        <LatestHistory 
                            latestCorrect={quizResult ? quizResult['excorrect'] : null}
                            latestQuestionNum={quizResult ? quizResult['exquestionNum'] : null}
                            date={quizResult ? quizResult['ex_createdate'] : ''}
                            totalIndex={quizResult ? quizResult['questionNum'] : 0}
                        />
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
                                        let navLocation = `/openbook/test/gaiq/mockquiz?quiz=${data['testId']}`;
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
                                                let navLocation = `/openbook/test/gaiq/mockquiz?quiz=${data['testId']}`;
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
                                        let navLocation = `/openbook/test/gaiq/mockquiz?quiz=${data['testId']}`;
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
                                                let navLocation = `/openbook/test/gaiq/mockquiz?quiz=${data['testId']}`;
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
                                        let navLocation = `/openbook/test/gaiq/mockquiz?quiz=${data['testId']}`;
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
                                                let navLocation = `/openbook/test/gaiq/mockquiz?quiz=${data['testId']}`;
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