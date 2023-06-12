import React, {useState, useEffect} from 'react';
import styles from 'stylesheets/workbook/quiz-test/QuizTestView.module.css';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import getQuizTest from 'queries/workbook/quiz-test/getQuizTest';
import QuizContentRadio from 'components/workbook/quiz-test/QuizContentRadio';

function QuizTestView(){
    const location = useLocation();
    const [countInterval, setCountInterval] = useState(0);
    const { isLoading, isError, data, error } = useQuery(['getQuizTest'], () => getQuizTest({testId: location.state.testId, testIndex: location.state.testIndex}));
    const [disabledBtn, setDisabledBtn] = useState(true);
    
    useEffect(() => {
        const timer = setInterval(() => {
            setCountInterval(countInterval => countInterval + 1);
        },1000)

        return () => clearInterval(timer);
    }, [])

    return (
        <div className={styles.quiz_test_view_root}>
            <div className={styles.quiz_test_view_header}>
                <div className={styles.quiz_index_container}>
                    <span>문제</span>
                    <span>{location.state.testIndex}/{location.state.totalIndex}</span>
                </div>

                <div className={styles.quiz_exit}>
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
                                        console.log(event.target);
                                    }}/>
                    }) : null}
                </div>
                <div className={styles.test_btn_container}>
                    <button disabled={disabledBtn}>다음</button>
                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default QuizTestView;