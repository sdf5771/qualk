import React from 'react';
import styles from './WorkbookDetailPresenter.module.css';
import PublicImageBtnContainer from "components/public/public-image-btn/PublicImageBtnContainer";
import {ReactComponent as ArrowLeftIconDefault} from 'assets/images/public/arrow_left_icon.svg';
import {ReactComponent as ArrowLeftIconHover} from 'assets/images/public/arrow_left_icon_hover.svg';
import {NavigateFunction,Location} from 'react-router-dom';
import QuestionViewContainer from "./question-view/QuestionViewContainer";

interface WorkbookDetailPresenterProps {
    navigate: NavigateFunction;
    location: Location;
}

function WorkbookDetailPresenter({location, navigate}: WorkbookDetailPresenterProps){
    return(
        <div className={styles.workbook_detail_root}>
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
                            navigate('/workbook')
                        }
                    }}
                />
            </div>
            <div>
                <QuestionViewContainer />
            </div>
        </div>
    )
}

export default WorkbookDetailPresenter;
