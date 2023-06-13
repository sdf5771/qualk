import React, {useState, useEffect} from 'react';
import styles from 'stylesheets/workbook/quiz-test/QuizTestView.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import getQuizTest from 'queries/workbook/quiz-test/getQuizTest';
import QuizContentRadio from 'components/workbook/quiz-test/QuizContentRadio';
import putQuizTest from 'queries/workbook/quiz-test/putQuizTest';

function QuizTestView(){
    const location = useLocation();
    const navigate = useNavigate();
    const [countInterval, setCountInterval] = useState(0);
    const [userSelect, setUserSelect] = useState<null | number>(null);
    const [isUserMutate, setIsUserMutate] = useState(false);
    const { isLoading: getQuizTestIsLoading, isError: getQuizTestIsError, data, error: getQuizTestError } = useQuery(['getQuizTest'], () => getQuizTest({testId: location.state.testId, testIndex: location.state.testIndex}));
    const { mutate, isLoading: putQuizTestIsLoading, isError: putQuizTestIsError, error: putQuizTestError, isSuccess: putQuizTestIsSucesss } = useMutation(putQuizTest);
    const [disabledBtn, setDisabledBtn] = useState(true);
    
    useEffect(() => {
        const timer = setInterval(() => {
            setCountInterval(countInterval => countInterval + 1);
        },1000)

        return () => clearInterval(timer);
    }, [])

    const submitBtnClickHandler = (event: React.MouseEvent) => {
        console.log('asdasdas', disabledBtn, isUserMutate)
        if(disabledBtn === false){
            if(isUserMutate){
                //유저가 답을 제출한 경우 '다음 문제로 넘어가야 하는 경우'
                navigate(`/quiz/test/gaiq/mockquiz?quiz=${data['testId']}`, 
                {
                    state: 
                    {testIndex: data['testindex'] + 1, testId: data['testId'], totalIndex: location.state.tatalIndex, prevPathName: location.pathname}
                });
            } else {
                //유저가 답을 아직 제출하지 않은 경우 '정답 및 해설을 표시해야 하는 경우'
                if(userSelect){
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
                                console.log('data ', data);
                            }
                        }
                    )
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

                <div onClick={() => {navigate(`${location.state.prevPathName}`)}} className={styles.quiz_exit}>
                    <span>종료하기</span>
                </div>
            </div>

            <div className={styles.test_container}>
                <div className={styles.test_title}>
                    <span>{data ? data.title : ''}</span>
                </div>
                <div className={styles.test_list_container}>
                    {data ? data.contentList.map((contentElement: string, index: number) => {
                        return <QuizContentRadio 
                                    key={index} 
                                    value={contentElement} 
                                    onChangeHandler={(event: React.ChangeEvent) => {
                                        setDisabledBtn(false);
                                        setUserSelect(index);
                                    }}/>
                    }) : null}
                </div>
                <div className={styles.test_btn_container}>
                    <button onClick={submitBtnClickHandler} disabled={disabledBtn}>{userSelect !== null && !isUserMutate ? "제출하기" : "다음"}</button>
                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default QuizTestView;