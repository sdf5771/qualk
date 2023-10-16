import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from 'stylesheets/workbook/quiz-test/QuizTestResult.module.css';
import PublicImageBtnContainer from 'components/public/public-image-btn/PublicImageBtnContainer';
import {ReactComponent as ArrowLeftIconDefault} from "assets/images/public/arrow_left_icon.svg";
import {ReactComponent as ArrowLeftIconHover} from "assets/images/public/arrow_left_icon_hover.svg";
import QuizSelectShortcutElement from 'components/workbook/quiz-test/QuizSelectShortcutElement';

function QuizTestResult(){
    const navigate = useNavigate();

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
                    <div>

                    </div>
                </div>

                <div className={styles.another_test_section}>
                    <div className={styles.header}>
                        <span>다른 퀴즈도 도전해 볼까요?</span>
                    </div>
                    <div className={styles.test_element_container}>
                        <QuizSelectShortcutElement />
                        <QuizSelectShortcutElement />
                        <QuizSelectShortcutElement />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default QuizTestResult;