import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import styles from 'stylesheets/workbook/search/QuizSearch.module.css'
import publicAnimations from 'stylesheets/public/animation.module.css'
import publicScrollbar from 'stylesheets/public/scrollbar.module.css'
import PublicImageBtnContainer from "../../../components/public/public-image-btn/PublicImageBtnContainer";
import {ReactComponent as ArrowLeftIconDefault} from "../../../assets/images/public/arrow_left_icon.svg";
import {ReactComponent as ArrowLeftIconHover} from "../../../assets/images/public/arrow_left_icon_hover.svg";

function QuizSearch(){
    const location = useLocation()
    const navigate = useNavigate()

    return(
        <div className={`${styles.quiz_root} ${publicAnimations.fade_in}`}>
            <div className={styles.header}>
                <PublicImageBtnContainer
                    btnText="뒤로가기"
                    options={{border: false}}
                    logoIcon={{
                        default: <ArrowLeftIconDefault />,
                        hover: <ArrowLeftIconHover />,
                    }}
                    btnClickEventHandler={(event: React.MouseEvent)=>{
                        if(location.state && location.state.beforeLocation){
                            navigate(location.state.beforeLocation)
                        } else {
                            navigate('/quiz/gaiq')
                        }
                    }}
                />
            </div>
            <div className={styles.search_result_header}>
                <div className={styles.title}>
                    <p>'Google'</p><span>에 대한 검색 결과입니다.</span>
                </div>
                <ul className={styles.list_container}>
                    <li><p>전체</p> <p>10</p></li>
                    <li><p>문제</p> <p>5</p></li>
                    <li><p>태그</p> <p>5</p></li>
                </ul>
            </div>
            <div>

                <div className={styles.result_container}>
                    <div className={styles.result_header}>
                        <div className={styles.result_title}>
                            <span>문제</span>
                            <span>5</span>
                        </div>
                        <div className={styles.btn_container}>
                            <span>전체보기</span>
                        </div>
                    </div>
                    <div className={styles.quiz_container}>

                    </div>
                </div>

                <div className={styles.result_container}>
                    <div className={styles.result_header}>
                        <div className={styles.result_title}>
                            <span>태그</span>
                            <span>5</span>
                        </div>
                        <div className={styles.btn_container}>
                            <span>전체보기</span>
                        </div>
                    </div>
                    <div className={styles.quiz_container}>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default QuizSearch;
