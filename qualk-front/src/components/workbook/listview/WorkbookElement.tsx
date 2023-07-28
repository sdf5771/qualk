import React, {memo} from 'react';
import styles from './WorkbookElement.module.css';
import publicAnimation from 'stylesheets/public/animation.module.css';
import KeywordElement from "./KeywordElement";
import {ReactComponent as ViewEyeIcon} from 'assets/images/workbook/listview/view_eye_icon.svg';
import {useNavigate, useLocation} from 'react-router-dom';
import {useDispatch} from "react-redux";
import { WorkbookDataType } from '../type/WorkbookDataType';

function WorkbookElement({ contentId, type, title, view, create, tag}: WorkbookDataType){
    const navigate = useNavigate();
    const location = useLocation();
    const workbookElementClickDispatch = useDispatch();
    const workbookElementOnClickHandler = (event: React.MouseEvent) => {
        workbookElementClickDispatch({type: 'workbookElementClick', questionType: type, questionId: contentId})
        navigate(`/quiz/${type.toLowerCase()}/${contentId}`, {state: {beforeLocation: location.pathname + location.search}})
    }

    return(
        <div onClick={workbookElementOnClickHandler} className={`${styles.workbook_element_root} ${publicAnimation.fade_and_slide}`}>
            <div className={styles.workbook_element_header}>
                <div className={styles.workbook_title}>
                    <span>{type}</span>
                    <span>#{contentId}</span>
                </div>
                <div className={styles.workbook_element_right_side_container}>
                    <div>
                        <ViewEyeIcon width="22px" height="22px"/>
                        <span>{view}</span>
                    </div>
                    <div></div>
                    <div>
                        <span>{create}</span>
                    </div>
                </div>
            </div>
            <div className={styles.workbook_element_title_container}>
                <span>{title}</span>
            </div>
            <div className={styles.workbook_keyword_container}>
                {tag ? tag.map((data:string, index:number) => {
                    if(data){
                        return <KeywordElement key={index} keywordTitle={data} />
                    }
                }) : null}
            </div>
        </div>
    )
}

export default memo(WorkbookElement);
