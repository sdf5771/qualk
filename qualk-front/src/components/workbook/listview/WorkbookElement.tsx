import React from 'react';
import styles from './WorkbookElement.module.css';
import KeywordElement from "./KeywordElement";

type WorkbookElementPropsType = {
    question_id: number,
    question_type: string,
    question_name: string,
    question_view: number,
    question_create: Date,
    question_tag: string[],
}

function WorkbookElement({ question_id, question_type, question_name, question_view, question_create, question_tag}: WorkbookElementPropsType){
    console.log('question_tags ', question_tag)
    return(
        <div className={styles.workbook_element_root}>
            <div className={styles.workbook_element_header}>
                <div className={styles.workbook_title}>
                    <span>{question_type}</span>
                    <span>#{question_id}</span>
                </div>
                <div className={styles.workbook_element_right_side_container}>
                    <div>
                        <div className={styles.eye_icon}></div>
                        <span>{question_view}</span>
                    </div>
                    <div></div>
                    <div>
                        <span>2022-00-00</span>
                    </div>
                </div>
            </div>
            <div className={styles.workbook_element_title_container}>
                <span>{question_name}</span>
            </div>
            <div className={styles.workbook_keyword_container}>
                {question_tag ? question_tag.map((data:string, index:number) => {
                    if(data){
                        return <KeywordElement key={index} keywordTitle={data}/>
                    }
                }) : null}
            </div>
        </div>
    )
}

export default WorkbookElement;
