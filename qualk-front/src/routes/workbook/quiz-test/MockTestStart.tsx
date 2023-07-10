import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from 'stylesheets/workbook/quiz-test/MockTestStart.module.css';
import PublicImageBtnContainer from 'components/public/public-image-btn/PublicImageBtnContainer';
import {ReactComponent as ArrowLeftIconDefault} from "assets/images/public/arrow_left_icon.svg";
import {ReactComponent as ArrowLeftIconHover} from "assets/images/public/arrow_left_icon_hover.svg";

function MockTestStart(){
    const navigate = useNavigate();
    const location = useLocation();

    const testStartOnClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        const navState = location.state;
        const navLocation = `/quiz/test/gaiq/mockexam?quiz=${navState['testId']}`;
        navigate(navLocation, 
            {
                state: navState
            }
        );
    }

    return(
        <div className={styles.mock_test_start_root}>
            <div className={styles.mock_test_start_header_container}> 
                <PublicImageBtnContainer
                        btnText="뒤로가기"
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

            <div className={styles.mock_exam_element_header}>
                <div className={`${styles.mock_exam_decobox} ${styles.bg_color}`}>
                    <span>50문항</span>
                </div>
                <div className={`${styles.mock_exam_decobox} ${styles.border_color}`}>
                    <span>응시시간 90분</span>
                </div>
            </div>

            <div className={styles.mock_test_guide_root}>
                <div className={styles.guide_title_container}>
                    <span>GAIQ 인증평가 모의 테스트</span>
                    <p>GAIQ 인증평가 모의테스트는 실제 GAIQ 인증평가와 비슷한 환경에서 테스트를 진행할 수 있도록 구성하였습니다.</p>
                </div>
                <div className={styles.description_container}>
                    <span className={styles.title}>유의사항</span>
                    <p className={styles.description}>GAIQ 인증평가 모의 테스트는 <b>50문항으로 구성</b>되어 있으며 <b>응시시간 90분안에 완료</b>해야 합니다.</p>
                    <p className={styles.description}>GAIQ 인증평가 모의테스트를 통과하려면 <b>80%이상의 점수(40문제 이상 정답)</b>가 필요합니다.</p>
                    <p className={styles.description}>평가를 일찍 종료하거나 충분한 질문에 올바르게 답하기 전에 타이머가 종료되면 통과하지 못하고 중단한 부분부터 다시 시작할 수 없습니다.</p>
                </div>
            </div>
            <div className={styles.btn_container}>
                <button onClick={testStartOnClickHandler}>테스트 시작하기</button>
            </div>
        </div>
    )
} 

export default MockTestStart;