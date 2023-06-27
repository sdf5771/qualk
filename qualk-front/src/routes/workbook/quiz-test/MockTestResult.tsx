import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from 'stylesheets/workbook/quiz-test/MockTestResult.module.css'
import {ReactComponent as ArrowLeftIconDefault} from "assets/images/public/arrow_left_icon.svg";
import {ReactComponent as ArrowLeftIconHover} from "assets/images/public/arrow_left_icon_hover.svg";
import PublicImageBtnContainer from 'components/public/public-image-btn/PublicImageBtnContainer';
import ResultPreview from 'components/workbook/quiz-test/ResultPreview';

function MockTestResult(){
    const navigate = useNavigate();
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
                    <span className={styles.title}>GAIQ 인증평가 모의 테스트 결과</span>
                    <span className={styles.re_test}>다시 응시하기</span>
                </div>
            </div>

            <div className={styles.result_preview}>
                <ResultPreview />
            </div>

            <div className={styles.result_infobox}>
                <div>
                    <span className={styles.title}>모의 테스트 결과 분석</span>
                </div>
                <div>

                </div>
            </div>

            <div className={styles.wrong_test_container}>
                <div>
                    <span className={styles.title}>틀린 문제</span>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default MockTestResult;