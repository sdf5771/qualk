import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import getQuizResult from 'queries/workbook/quiz-test/getQuizResult';
import styles from 'stylesheets/workbook/quiz-test/MockTestResult.module.css'
import {ReactComponent as ArrowLeftIconDefault} from "assets/images/public/arrow_left_icon.svg";
import {ReactComponent as ArrowLeftIconHover} from "assets/images/public/arrow_left_icon_hover.svg";
import PublicImageBtnContainer from 'components/public/public-image-btn/PublicImageBtnContainer';
import ResultPreview from 'components/workbook/quiz-test/ResultPreview';
import TestTimeViewer from 'components/workbook/quiz-test/TestTimeViewer';
import WrongTestChart from 'components/workbook/quiz-test/WrongTestChart';
import WorkbookElement from 'components/workbook/listview/WorkbookElement';
import correctComment from 'javascripts/correctComment';
import timeComment from 'javascripts/timeComment';
import createQuizTest from 'queries/workbook/quiz-test/createQuizTest';

function MockTestResult(){
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const queryStr = location.search ? location.search.split('=')[1] : '';
    const { isLoading, isError, data, error, isFetching } = useQuery([`getQuizResult`], () => getQuizResult({testId: queryStr}));
    const { mutate } = useMutation(createQuizTest);
    const [correctCmtState, setCorrectCmtState] = useState('');
    const [timeCmt, setTimeCmt] = useState('');

    useEffect(() => {
        if(data){
            setCorrectCmtState(correctComment(data.correctPercent, data.passPercent, data.pass));
            setTimeCmt(timeComment(data.userTime, data.totalTime, data.pass));
        }
    }, [data])

    // 404 Error redirect 
    if(isError){
        navigate('/not_found');
    }
    if( !isLoading && data === undefined){
        navigate('/not_found');
    }

    const reTestStartClickHandler = (event: React.MouseEvent<HTMLSpanElement>) => {
        mutate(
            {type: 'gaiq', userId: 'TestUser', testNum: 50}, 
            {onSuccess: (data: {testId: string, testIndex: number}) => {
                if(data){
                    let navState = {testIndex: data['testIndex'], testId: data['testId'], totalIndex: 50, prevPathName: location.pathname}
                    let navLocation = `/quiz/test/gaiq/mockexam?quiz=${data['testId']}`;
                    if(data.testIndex !== 1){
                        dispatch({type: "okCancelModalOpen", navLocation: navLocation ,navigationState: navState, mutateFunc: mutate})
                    } else {
                        navigate(`/quiz/test/mockexam/start/`, 
                        {
                            state: navState
                        }
                        );
                    }
                }
            }})
    }

    return(
        <div className={styles.mock_test_result_root}>
            <div className={styles.mock_test_result_header}>
                <div>
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
                </div>
                <div>
                    <span className={styles.title}>{data ? data.canonialName : ''} 결과</span>
                    <span className={styles.re_test} onClick={reTestStartClickHandler}>다시 응시하기</span>
                </div>
            </div>

            <div className={styles.result_preview}>
                <ResultPreview 
                    totalIndex={data ? data.questionNum : 0} 
                    userCorrected={data ? data.correct : 0}  
                    passPercent={data ? data.passPercent: 0}  
                    passNum={data ? data.passNum : 0}  
                    totalTime={data ? data.totalTime : 0}  
                    isPass={data ? data.pass : false}  
                    />
            </div>

            <div className={styles.result_infobox}>
                <div>
                    <span className={styles.title}>모의고사 결과 분석</span>
                </div>
                <div style={{marginTop: '29px', display: 'flex', gap: '40px', width: '100%'}}>
                    <TestTimeViewer userTime={data ? data.userTime : 0} totalTime={data ? data.totalTime : 0} comment={timeCmt} isPass={data ? data.pass : false} />
                    <WrongTestChart userCorrected={data ? data.correct : 0} totalIndex={data ? data.questionNum : 0} correctPercent={data ? data.correctPercent : 0} command={correctCmtState} isPass={data ? data.pass : false} />
                </div>
            </div>

            <div className={styles.wrong_test_container}>
                <div>
                    <span className={styles.title}>틀린문제</span>
                </div>
                <div style={{marginTop: '29px', marginBottom: '100px', display: 'flex', flexDirection: 'column', gap: '20px'}}>
                    {data && data.wrongQuestion ? 
                    data.wrongQuestion.map((quizData: {ContentID: number, CreateDate: string, Tag: string[] | null, Type: string, Title: string, View: number}) => {
                        return <WorkbookElement 
                                    key={quizData.ContentID}
                                    question_id={quizData.ContentID}
                                    question_type={quizData.Type}
                                    question_name={quizData.Title}
                                    question_view={quizData.View}
                                    question_create={quizData.CreateDate}
                                    question_tag={quizData.Tag}
                                    />
                    }) : null}
                </div>
            </div>
        </div>
    )
}

export default MockTestResult;