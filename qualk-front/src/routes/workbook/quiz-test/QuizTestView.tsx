import React, {useState, useEffect} from 'react';
import styles from 'stylesheets/workbook/quiz-test/QuizTestView.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import getQuizTest from 'queries/workbook/quiz-test/getQuizTest';
import QuizContentRadio from 'components/workbook/quiz-test/QuizContentRadio';
import putQuizTest from 'queries/workbook/quiz-test/putQuizTest';
import AnswerAndExplainContainer from 'components/workbook/workbook-detail/answer-and-explanation/AnswerAndExplainContainer';
import useInterval from 'hook/useInterval';
import TestTimer from 'components/public/test-timer/TestTimer';

type TgetQuizTestData = {
    testId: string,
    title: string,
    contentList: string[]
}

function QuizTestView(){
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLast, setIsLast] = useState(false);
    const [timerMinute, setTimerMinute] = useState(89);
    const [timerSecond, setTimerSecond] = useState(59);
    const [countInterval, setCountInterval] = useState(0);
    const [userSelect, setUserSelect] = useState<null | number>(null);
    const [isUserMutate, setIsUserMutate] = useState(false);
    const [correctIndex, setCorrectIndex] = useState<null | number>(null);
    const [answerDescription, setAnswerDescription] = useState(null);
    const [referenceUrl, setReferenceUrl] = useState(null);
    const [isMockExam, setIsMockExam] = useState(false);
    const [data, setData] = useState<TgetQuizTestData | null>(null);
    const { isLoading: getQuizTestIsLoading, isError: getQuizTestIsError, data: getQuizTestData, error: getQuizTestError } = useQuery([`getQuizTest-${location.state.testIndex}`], () => getQuizTest({testId: location.state.testId, testIndex: location.state.testIndex}));
    const { mutate, isLoading: putQuizTestIsLoading, isError: putQuizTestIsError, error: putQuizTestError, isSuccess: putQuizTestIsSucesss } = useMutation(putQuizTest);
    const [disabledBtn, setDisabledBtn] = useState(true);

    useInterval(() => {
        setCountInterval(countInterval + 1);
    }, 1000);
    console.log('getQuizTestData ', getQuizTestData);
    useEffect(() => {
        const second = setInterval(() => {
            setTimerSecond((prev) => prev - 1);
        }, 1000)

        const minute = setInterval(() => {
            setTimerMinute((prev) => prev - 1);
            setTimerSecond(59);
        }, 59000)

        return () => {
            clearInterval(second);
            clearInterval(minute);
        }
    }, [location.search])
 
    useEffect(() => {
        return () => {
            setCountInterval(0);
        }
    }, [location.search])

    useEffect(() => {
        //모의고사인 경우
        if(location.pathname.split('/')[4] === 'mockexam'){
            setIsMockExam(true);
        }
        if(getQuizTestData){
            setIsLast(getQuizTestData.lastIndex);
            setData(getQuizTestData)
        }

        return () => {
            setData(null);
            setIsUserMutate(false);
            setDisabledBtn(true);
        } 
    },[getQuizTestData, getQuizTestIsLoading])

    const submitBtnClickHandler = (event: React.MouseEvent) => {
        if(disabledBtn === false){
            if(isMockExam){
                if(userSelect !== null){
                    mutate(
                        {
                            testId: location.state.testId, 
                            testIndex: location.state.testIndex,
                            userCorrect: userSelect,
                            interval: countInterval,
                        },
                        {
                            onSuccess: (data) => {
                                setIsUserMutate(true);
                                setCorrectIndex(data.correct)
                                setAnswerDescription(data.description);
                                setReferenceUrl(data.reference_url);
                                dispatch({type:"mutateRadio", correctIndex: data.correct, isMutate: true, selectIndex: userSelect});
                            }
                        }
                    )
                    if(isLast){
                        navigate(`/quiz/test/mockexam/result/?test-id=${data?.testId}`)
                    } else {
                        //유저가 답을 제출한 경우 '다음 문제로 넘어가야 하는 경우'
                        navigate(`/quiz/test/gaiq/mockexam?quiz=${data && data['testId']}&test-index=${location.state.testIndex + 1}`, 
                        {
                            state: 
                            {testIndex: location.state.testIndex + 1, testId: data && data['testId'], totalIndex: location.state.totalIndex, prevPathName: location.pathname}
                        });
                    }
                }
            }else{
                if(isUserMutate){
                    if(isLast){
                        navigate('/quiz/test/gaiq');
                    } else {
                        //유저가 답을 제출한 경우 '다음 문제로 넘어가야 하는 경우'
                        navigate(`/quiz/test/gaiq/mockquiz?quiz=${data && data['testId']}&test-index=${location.state.testIndex + 1}`, 
                        {
                            state: 
                            {testIndex: location.state.testIndex + 1, testId: data && data['testId'], totalIndex: location.state.totalIndex, prevPathName: location.pathname}
                        });
                    }
                } else {
                    //유저가 답을 아직 제출하지 않은 경우 '정답 및 해설을 표시해야 하는 경우'
                    if(userSelect !== null){
                        mutate(
                            {
                                testId: location.state.testId, 
                                testIndex: location.state.testIndex,
                                userCorrect: userSelect,
                                interval: countInterval,
                            },
                            {
                                onSuccess: (data) => {
                                    setIsUserMutate(true);
                                    setCorrectIndex(data.correct)
                                    setAnswerDescription(data.description);
                                    setReferenceUrl(data.reference_url);
                                    dispatch({type:"mutateRadio", correctIndex: data.correct, isMutate: true, selectIndex: userSelect});
                                }
                            }
                        )
                    }
                }
            }
        }
    }

    return (
        <div className={styles.quiz_test_view_root}>
            <div className={styles.quiz_test_view_header}>
                <div className={styles.quiz_index_container}>
                    <span>문제</span>
                    <span>{location.state.testIndex}/{location.state.totalIndex}</span>
                </div>

                {/* <div onClick={() => {navigate(`/quiz/test/gaiq/`)}} className={styles.quiz_exit}>
                    <span>종료하기</span>
                </div> */}
                {isMockExam ? 
                <div>
                    <TestTimer time={`${timerMinute >= 10 ? timerMinute : '0' + timerMinute}:${timerSecond >= 10 ? timerSecond : '0' + timerSecond}`}/>
                </div>
                : null}
            </div>

            <div className={styles.test_container}>
                <div className={styles.test_title}>
                    <span>{data ? data.title : ''}</span>
                </div>
                <div className={styles.test_list_container}>
                    {data ? data.contentList.map((contentElement: string, index: number) => {
                        return <QuizContentRadio 
                                    key={contentElement+index} 
                                    index={index}
                                    value={contentElement}
                                    isMutate={isUserMutate} 
                                    selectIndex={userSelect}
                                    correctIndex={correctIndex}
                                    isMockExam={isMockExam}
                                    onChangeHandler={(event: React.ChangeEvent) => {
                                        setDisabledBtn(false);
                                        setUserSelect(index);
                                    }}/>
                    }) : null}
                </div>
                {isUserMutate && !isMockExam ? 
                <div>
                    <AnswerAndExplainContainer 
                        quizList={data && data.contentList}
                        correctIndex={correctIndex}
                        description={answerDescription}
                        referenceData={referenceUrl}
                    />
                </div>
                : null}
                <div className={styles.test_btn_container}>
                    <button onClick={submitBtnClickHandler} disabled={disabledBtn}>{userSelect !== null && !isUserMutate && !isMockExam ? "제출하기" : "다음"}</button>
                    <button onClick={() => {navigate(`/quiz/test/gaiq/`)}}>종료하기</button>
                </div>
            </div>
        </div>
    )
}

export default QuizTestView;