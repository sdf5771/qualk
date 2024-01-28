import React from 'react';
import styles from './TopViewWorkbookElement.module.css'
import KeywordElement from "./KeywordElement";
import {useLocation, useNavigate} from "react-router-dom";
import { WorkbookDataType } from '../type/WorkbookDataType';
import {ReactComponent as ViewEyeIcon} from 'assets/images/workbook/listview/view_eye_icon.svg';

function TopViewWorkbookElement({ contentId, type, title, view, create, tag}: WorkbookDataType){
    const navigate = useNavigate();
    const location = useLocation();
    const topViewWorkbookElementOnClickHandler = (event: React.MouseEvent) => {
        navigate(`/openbook/${type.toLowerCase()}/${contentId}`, {state: {beforeLocation: location.pathname}})
    }
    return(
        <div onClick={topViewWorkbookElementOnClickHandler} className={styles.top_view_workbook_root}>
            <div className={styles.top_view_workbook_header}>
                <div className={styles.top_view_workbook_title}>
                    <span>{type}</span>
                    <span>#{contentId}</span>
                </div>
                <div className={styles.top_view_workbook_right_side_container}>
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
            <div className={styles.top_view_workbook_content}>
                <span>{title}</span>
            </div>
            <div className={styles.top_view_workbook_tag_container}>
                {tag ? tag.map((data:string, index:number) => {
                    if(data){
                        return <KeywordElement key={index} keywordTitle={data} />
                    }
                }) : null}
            </div>
        </div>
    )
}

export default TopViewWorkbookElement;
