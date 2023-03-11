import React from 'react';
import styles from './WorkbookElement.module.css';
import KeywordElement from "./KeywordElement";
import {ReactComponent as ViewEyeIcon} from 'assets/images/workbook/listview/view_eye_icon.svg';
import {useNavigate, useLocation} from 'react-router-dom';
import {useDispatch} from "react-redux";

type WorkbookElementPropsType = {
    question_id: number,
    question_type: string,
    question_name: string,
    question_view: number,
    question_create: string,
    question_tag: string[],
}

function WorkbookElement({ question_id, question_type, question_name, question_view, question_create, question_tag}: WorkbookElementPropsType){
    const navigate = useNavigate();
    const location = useLocation();
    const workbookElementClickDispatch = useDispatch();
    const workbookElementOnClickHandler = (event: React.MouseEvent) => {
        workbookElementClickDispatch({type: 'workbookElementClick', questionType: question_type, questionId: question_id})
        navigate(`/workbook/${question_type}&${question_id}`, {state: {beforeLocation: location.pathname}})
    }

    return(
        <div onClick={workbookElementOnClickHandler} className={styles.workbook_element_root}>
            <div className={styles.workbook_element_header}>
                <div className={styles.workbook_title}>
                    <span>{question_type}</span>
                    <span>#{question_id}</span>
                </div>
                <div className={styles.workbook_element_right_side_container}>
                    <div>
                        <ViewEyeIcon width="22px" height="22px"/>
                        <span>{question_view}</span>
                    </div>
                    <div></div>
                    <div>
                        <span>{question_create}</span>
                    </div>
                </div>
            </div>
            <div className={styles.workbook_element_title_container}>
                <span>{question_name}</span>
            </div>
            <div className={styles.workbook_keyword_container}>
                {question_tag ? question_tag.map((data:string, index:number) => {
                    if(data){
                        return <KeywordElement key={index} keywordTitle={data} theme="gray"/>
                    }
                }) : null}
            </div>
        </div>
    )
}

export default WorkbookElement;
