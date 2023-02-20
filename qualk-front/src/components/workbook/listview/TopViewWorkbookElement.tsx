import React from 'react';
import styles from './TopViewWorkbookElement.module.css'
import KeywordElement from "./KeywordElement";

type TopViewWorkbookElementPropsType = {
    question_id: number,
    question_type: string,
    question_name: string,
    question_view: number,
    question_create: Date,
    question_tag: string[],
}

function TopViewWorkbookElement({ question_id, question_type, question_name, question_view, question_create, question_tag}: TopViewWorkbookElementPropsType){
    return(
        <div className={styles.top_view_workbook_root}>
            <div className={styles.top_view_workbook_header}>
                <span>{question_type}</span>
                <span>#{question_id}</span>
            </div>
            <div className={styles.top_view_workbook_content}>
                <span>{question_name}</span>
            </div>
            <div className={styles.top_view_workbook_tag_container}>
                {question_tag ? question_tag.map((data:string, index:number) => {
                    if(data){
                        return <KeywordElement key={index} keywordTitle={data} theme="yellow"/>
                    }
                }) : null}
            </div>
        </div>
    )
}

export default TopViewWorkbookElement;