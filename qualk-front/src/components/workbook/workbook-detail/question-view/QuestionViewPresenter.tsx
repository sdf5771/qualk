import React, {Dispatch} from 'react';
import styles from './QuestionViewPresenter.module.css';
import QuestionElement from "./QuestionElement";
import AnswerAndExplainContainer from "components/workbook/workbook-detail/answer-and-explanation/AnswerAndExplainContainer";
import {WorkbookDataType} from "../../type/WorkbookDataType";
import {ReactComponent as ShareIconDefault} from 'assets/images/public/share_icon_default.svg';
import {ReactComponent as ShareIconHover} from 'assets/images/public/share_icon_hover.svg';
import {ReactComponent as ListviewIconDefault} from 'assets/images/public/listview_icon_default.svg';
import {ReactComponent as ListviewIconHover} from 'assets/images/public/listview_icon_hover.svg';
import PublicImageBtnContainer from "components/public/public-image-btn/PublicImageBtnContainer";
import {NavigateFunction} from "react-router-dom";
import { actionType } from 'reducers/workbook/workbook-detail/shareWorkbookClickReducer';

type QuestionViewPresenterPropsType = {
    navigate: NavigateFunction
    workbookData: WorkbookDataType
    dispatch: Dispatch<actionType>,
}

function QuestionViewPresenter({navigate, workbookData, dispatch}:QuestionViewPresenterPropsType){
    console.log(workbookData);
    return(
        <div className={styles.question_view_root}>
            <div className={styles.question_view_title_container}>
                <span>{workbookData ? workbookData.question_type : ''} (Google Analytics) #{workbookData ? workbookData.question_id : ''}</span>
                <span>Q. {workbookData ? workbookData.question_name : ''}</span>
            </div>
            <div className={styles.question_container}>
                {workbookData && workbookData.question_contents ? workbookData.question_contents.map((question,index) => {
                    if(question){
                        return <QuestionElement key={index} questionTitle={question} isCorrect={workbookData.question_correct == index ? true : false}/>
                    }
                }) : null}

            </div>
            <AnswerAndExplainContainer workbookData={workbookData} />
            <div className={styles.question_btn_container}>
                <PublicImageBtnContainer
                    btnText="목록으로"
                    options={{border: true}}
                    logoIcon={{
                        default: <ListviewIconDefault />,
                        hover: <ListviewIconHover />,
                    }}
                    btnClickEventHandler={(event: React.MouseEvent)=>{
                        navigate('/workbook')
                    }}
                />

                <PublicImageBtnContainer
                    btnText="공유하기"
                    options={{border: true}}
                    logoIcon={{
                        default: <ShareIconDefault />,
                        hover: <ShareIconHover />,
                    }}
                    btnClickEventHandler={(event: React.MouseEvent)=>{
                        if(dispatch){
                            dispatch({type: 'shareWorkbookClick', modalStateId: 1});
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default QuestionViewPresenter;
