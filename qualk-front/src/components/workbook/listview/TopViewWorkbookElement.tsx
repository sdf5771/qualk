import React from 'react';
import styles from './TopViewWorkbookElement.module.css'
import KeywordElement from "./KeywordElement";
import {useLocation, useNavigate} from "react-router-dom";
import { WorkbookDataType } from '../type/WorkbookDataType';

function TopViewWorkbookElement({ contentId, type, title, view, create, tag}: WorkbookDataType){
    const navigate = useNavigate();
    const location = useLocation();
    const topViewWorkbookElementOnClickHandler = (event: React.MouseEvent) => {
        navigate(`/openbook/${type.toLowerCase()}/${contentId}`, {state: {beforeLocation: location.pathname}})
    }
    return(
        <div onClick={topViewWorkbookElementOnClickHandler} className={styles.top_view_workbook_root}>
            <div className={styles.top_view_workbook_header}>
                <span>{type}</span>
                <span>#{contentId}</span>
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
