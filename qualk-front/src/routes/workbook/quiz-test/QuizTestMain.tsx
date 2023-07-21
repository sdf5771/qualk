import React, {useEffect, useState} from 'react';
import styles from 'stylesheets/workbook/quiz-test/QuizTestMain.module.css';
import publicAnimations from 'stylesheets/public/animation.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import {ReactComponent as GaiqLogo} from 'assets/images/workbook/listview/gaiq_logo.svg';
import QuizSelectElement from 'components/workbook/quiz-test/QuizSelectElement';
import MockExamSelectElement from 'components/workbook/quiz-test/MockExamSelectElement';
import {RootState} from "reducers/reducers";
import {useSelector, useDispatch} from "react-redux";
import NoContents from "components/public/no-contents/NoContents";
import {ReactComponent as DocsLogo} from 'assets/images/workbook/quiz-test/docs_logo.svg';
import {ReactComponent as MockTestLogo} from 'assets/images/workbook/quiz-test/mocktest_logo.svg';
import {ReactComponent as QualkImageFirst} from 'assets/images/workbook/quiz-test/qualk_image_01.svg'
import {ReactComponent as QualkImageSecond} from 'assets/images/workbook/quiz-test/qualk_image_02.svg'
import {ReactComponent as QualkImageThird} from 'assets/images/workbook/quiz-test/qualk_image_03.svg'
import {ReactComponent as QualkImageFirstHover} from 'assets/images/workbook/quiz-test/qualk_image_01_hover.svg'
import {ReactComponent as QualkImageSecondHover} from 'assets/images/workbook/quiz-test/qualk_image_02_hover.svg'
import {ReactComponent as QualkImageThirdHover} from 'assets/images/workbook/quiz-test/qualk_image_03_hover.svg'
import {ReactComponent as QualkMockTestImage} from 'assets/images/workbook/quiz-test/qualk_mock_test.svg'
import { useMutation } from '@tanstack/react-query';
import createQuizTest from 'queries/workbook/quiz-test/createQuizTest';
import useRedirect from 'hook/useRedirect';

function QuizTestMain(){
    const menuElementActivateSelector = useSelector((state:RootState) => state.childMenuClickReducer);
    const [category, setCategory] = useState(menuElementActivateSelector);
    const { mutate, isLoading, isError, error, isSuccess } = useMutation(createQuizTest);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const {notFoundPageRedirect} = useRedirect();

    useEffect(() => {
        notFoundPageRedirect();
    }, [location.pathname])

    useEffect(() => {
        setCategory(menuElementActivateSelector);
    }, [menuElementActivateSelector['activeMenu']])

    return (
        <div className={`${styles.quiz_test_root} ${publicAnimations.fade_in}`}>
            <div className={styles.quiz_test_header}>
                <div className={styles.quiz_test_title_container}>
                    <GaiqLogo width="50px" height="50px"/>
                    <span>{category['activeMenu']}</span>
                </div>

                <div className={styles.test_list_container}>
                    <div className={styles.test_list_header}>
                        <DocsLogo />
                        <span>테스트를 대비하세요!</span>
                    </div>
                    <div className={styles.test_list_body}>
                        <QuizSelectElement 
                            testLength={10} 
                            time={10} 
                            title="처음은 간단하게 시작해볼까요?" 
                            description={`아직은 자신 없는 ${category['activeMenu']} 테스트, \n 랜덤으로 출제되는 10문제 퀴즈로 \n 워밍업해보세요!`}
                            option={{backgroundColor: "#ffba00", fontColor: "#ffffff"}}
                            SVGComponent={QualkImageFirst}
                            SVGComponentHover={QualkImageFirstHover}
                            onClickHandler={(event:React.MouseEvent<HTMLDivElement>) => {
                                mutate(
                                    {type: 'gaiq', userId: 'TestUser', testNum: 10}, 
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
                            }}
                            />
                        <QuizSelectElement 
                            testLength={20} 
                            time={20} 
                            title="이제 할만 하죠?" 
                            description={`${category['activeMenu']} 테스트에 대한 감이 생기셨나요? \n 그렇다면 랜덤으로 출제되는 20문제 퀴즈로 \n 실력을 좀 더 높여볼까요?`}
                            option={{backgroundColor: "#ff9300", fontColor: "#ffffff"}}
                            SVGComponent={QualkImageSecond}
                            SVGComponentHover={QualkImageSecondHover}
                            onClickHandler={(event:React.MouseEvent<HTMLDivElement>) => {
                                mutate(
                                    {type: 'gaiq', userId: 'TestUser', testNum: 20}, 
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
                            }}
                            />
                        <QuizSelectElement 
                            testLength={30} 
                            time={30} 
                            title="테스트 폼 미쳤다!" 
                            description={`이제 거의 다 왔어요! \n 랜덤으로 출제되는 30문제 퀴즈를 통한 \n ${category['activeMenu']} 테스트 완벽 준비!`}
                            option={{backgroundColor: "#ff6c00", fontColor: "#ffffff"}}
                            SVGComponent={QualkImageThird}
                            SVGComponentHover={QualkImageThirdHover}
                            onClickHandler={(event:React.MouseEvent<HTMLDivElement>) => {
                                mutate(
                                    {type: 'gaiq', userId: 'TestUser', testNum: 30}, 
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
                            }}
                            />
                    </div>
                </div>

                <div className={styles.mockexam_container}>
                    <div className={styles.mockexam_header}>
                        <MockTestLogo />
                        <span>실전과 비슷한 환경의 모의고사에요.</span>
                    </div>
                    <div className={styles.mockexam_body}>
                        <MockExamSelectElement 
                            testLength={50} 
                            time={90} 
                            title="연습은 그만! 이제 실전으로" 
                            description={`${category['activeMenu']} 테스트의 실제 응시 환경처럼 주어진 90분 내에 50문항을 풀어볼까요? \n 시험이 끝나고 난 뒤, 합격 결과를 예측해볼 수 있어요!`}
                            SVGComponent={QualkMockTestImage}
                            clickEventHandler={(event: React.MouseEvent<HTMLDivElement>) => {
                                mutate(
                                    {type: 'gaiq', userId: 'TestUser', testNum: 50}, 
                                    {onSuccess: (data: {testId: string, testIndex: number, time: number}) => {
                                        if(data){
                                            console.log('data ', data);
                                            let navState = {testIndex: data['testIndex'], testId: data['testId'], totalIndex: 50, prevPathName: location.pathname, testTime: data['time']}
                                            let navLocation = `/quiz/test/gaiq/mockexam?quiz=${data['testId']}`;
                                            if(data.testIndex !== 1){
                                                dispatch({type: "okCancelModalOpen", navLocation: navLocation ,navigationState: navState, mutateFunc: mutate})
                                            } else {
                                                console.log('data ', data);
                                                navigate(`/quiz/test/mockexam/start/`, 
                                                {
                                                    state: navState
                                                }
                                                );
                                            }
                                        }
                                    }})
                            }}
                            />
                            
                    </div>
                </div>

            </div>
        </div>
    )

    // if(category['activeMenu'] === "GAIQ"){
    //     return (
    //         <div className={`${styles.quiz_test_root} ${publicAnimations.fade_in}`}>
    //             <div className={styles.quiz_test_header}>
    //                 <div className={styles.quiz_test_title_container}>
    //                     <GaiqLogo width="50px" height="50px"/>
    //                     <span>{category['activeMenu']}</span>
    //                 </div>
    
    //                 <div className={styles.test_list_container}>
    //                     <div className={styles.test_list_header}>
    //                         <DocsLogo />
    //                         <span>테스트를 대비하세요!</span>
    //                     </div>
    //                     <div className={styles.test_list_body}>
    //                         <QuizSelectElement 
    //                             testLength={10} 
    //                             time={10} 
    //                             title="처음은 간단하게 시작해볼까요?" 
    //                             description={`아직은 자신 없는 ${category['activeMenu']} 테스트, \n 랜덤으로 출제되는 10문제 퀴즈로 \n 워밍업해보세요!`}
    //                             option={{backgroundColor: "#ffba00", fontColor: "#ffffff"}}
    //                             SVGComponent={QualkImageFirst}
    //                             SVGComponentHover={QualkImageFirstHover}
    //                             onClickHandler={(event:React.MouseEvent<HTMLDivElement>) => {
    //                                 mutate(
    //                                     {type: 'gaiq', userId: 'TestUser', testNum: 10}, 
    //                                     {onSuccess: (data: {testId: string, testIndex: number}) => {
    //                                         if(data){
    //                                             let navState = {testIndex: data['testIndex'], testId: data['testId'], totalIndex: 10, prevPathName: location.pathname}
    //                                             let navLocation = `/quiz/test/gaiq/mockquiz?quiz=${data['testId']}`;
    //                                             if(data.testIndex !== 1){
    //                                                 dispatch({type: "okCancelModalOpen", navLocation: navLocation ,navigationState: navState, mutateFunc: mutate})
    //                                             } else {
    //                                                 navigate(navLocation, 
    //                                                 {
    //                                                     state: navState
    //                                                 }
    //                                                 );
    //                                             }
    //                                         }
    //                                     }})
    //                             }}
    //                             />
    //                         <QuizSelectElement 
    //                             testLength={20} 
    //                             time={20} 
    //                             title="이제 할만 하죠?" 
    //                             description={`${category['activeMenu']} 테스트에 대한 감이 생기셨나요? \n 그렇다면 랜덤으로 출제되는 20문제 퀴즈로 \n 실력을 좀 더 높여볼까요?`}
    //                             option={{backgroundColor: "#ff9300", fontColor: "#ffffff"}}
    //                             SVGComponent={QualkImageSecond}
    //                             SVGComponentHover={QualkImageSecondHover}
    //                             onClickHandler={(event:React.MouseEvent<HTMLDivElement>) => {
    //                                 mutate(
    //                                     {type: 'gaiq', userId: 'TestUser', testNum: 20}, 
    //                                     {onSuccess: (data: {testId: string, testIndex: number}) => {
    //                                         if(data){
    //                                             let navState = {testIndex: data['testIndex'], testId: data['testId'], totalIndex: 20, prevPathName: location.pathname}
    //                                             let navLocation = `/quiz/test/gaiq/mockquiz?quiz=${data['testId']}`;
    //                                             if(data.testIndex !== 1){
    //                                                 dispatch({type: "okCancelModalOpen", navLocation: navLocation ,navigationState: navState, mutateFunc: mutate})
    //                                             } else {
    //                                                 navigate(navLocation, 
    //                                                 {
    //                                                     state: navState
    //                                                 }
    //                                                 );
    //                                             }
    //                                         }
    //                                     }})
    //                             }}
    //                             />
    //                         <QuizSelectElement 
    //                             testLength={30} 
    //                             time={30} 
    //                             title="테스트 폼 미쳤다!" 
    //                             description={`이제 거의 다 왔어요! \n 랜덤으로 출제되는 30문제 퀴즈를 통한 \n ${category['activeMenu']} 테스트 완벽 준비!`}
    //                             option={{backgroundColor: "#ff6c00", fontColor: "#ffffff"}}
    //                             SVGComponent={QualkImageThird}
    //                             SVGComponentHover={QualkImageThirdHover}
    //                             onClickHandler={(event:React.MouseEvent<HTMLDivElement>) => {
    //                                 mutate(
    //                                     {type: 'gaiq', userId: 'TestUser', testNum: 30}, 
    //                                     {onSuccess: (data: {testId: string, testIndex: number}) => {
    //                                         if(data){
    //                                             let navState = {testIndex: data['testIndex'], testId: data['testId'], totalIndex: 30, prevPathName: location.pathname}
    //                                             let navLocation = `/quiz/test/gaiq/mockquiz?quiz=${data['testId']}`;
    //                                             if(data.testIndex !== 1){
    //                                                 dispatch({type: "okCancelModalOpen", navLocation: navLocation ,navigationState: navState, mutateFunc: mutate})
    //                                             } else {
    //                                                 navigate(navLocation, 
    //                                                 {
    //                                                     state: navState
    //                                                 }
    //                                                 );
    //                                             }
    //                                         }
    //                                     }})
    //                             }}
    //                             />
    //                     </div>
    //                 </div>
    
    //                 <div className={styles.mockexam_container}>
    //                     <div className={styles.mockexam_header}>
    //                         <MockTestLogo />
    //                         <span>실전과 비슷한 환경의 모의고사에요.</span>
    //                     </div>
    //                     <div className={styles.mockexam_body}>
    //                         <MockExamSelectElement 
    //                             testLength={50} 
    //                             time={90} 
    //                             title="연습은 그만! 이제 실전으로" 
    //                             description={`${category['activeMenu']} 테스트의 실제 응시 환경처럼 주어진 90분 내에 50문항을 풀어볼까요? \n 시험이 끝나고 난 뒤, 합격 결과를 예측해볼 수 있어요!`}
    //                             SVGComponent={QualkMockTestImage}
    //                             clickEventHandler={(event: React.MouseEvent<HTMLDivElement>) => {
    //                                 mutate(
    //                                     {type: 'gaiq', userId: 'TestUser', testNum: 50}, 
    //                                     {onSuccess: (data: {testId: string, testIndex: number}) => {
    //                                         if(data){
    //                                             let navState = {testIndex: data['testIndex'], testId: data['testId'], totalIndex: 50, prevPathName: location.pathname}
    //                                             let navLocation = `/quiz/test/gaiq/mockexam?quiz=${data['testId']}`;
    //                                             if(data.testIndex !== 1){
    //                                                 dispatch({type: "okCancelModalOpen", navLocation: navLocation ,navigationState: navState, mutateFunc: mutate})
    //                                             } else {
    //                                                 navigate(`/quiz/test/mockexam/start/`, 
    //                                                 {
    //                                                     state: navState
    //                                                 }
    //                                                 );
    //                                             }
    //                                         }
    //                                     }})
    //                             }}
    //                             />
                                
    //                     </div>
    //                 </div>
    
    //             </div>
    //         </div>
    //     )
    // } else {
    //     return (
    //         <div className={`${styles.quiz_test_root} ${publicAnimations.fade_in}`}>
    //             <div className={styles.quiz_test_header}>
    //                 <div className={styles.quiz_test_title_container}>
    //                     <GaiqLogo width="50px" height="50px"/>
    //                     <span>{category ? category['activeMenu'] : 'Loading'}</span>
    //                 </div>
    //                 <div className={styles.no_contents_container}>
    //                     <NoContents />
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }
}

export default QuizTestMain;