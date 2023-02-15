import React from 'react';
import styles from './WorkbookElement.module.css';
import KeywordElement from "./KeywordElement";

type WorkbookElementPropsType = {
    question_number: number,
    qualification: string,
    question: string,
    views: number,
    created: Date,
    keywords: string[],
}

function WorkbookElement({ question_number, qualification, question, views, created, keywords}: WorkbookElementPropsType){
    console.log('keywords ', keywords)
    return(
        <div className={styles.workbook_element_root}>
            <div className={styles.workbook_element_header}>
                <div className={styles.workbook_title}>
                    <span>{qualification}</span>
                    <span>#{question_number}</span>
                </div>
                <div className={styles.workbook_element_right_side_container}>
                    <div>
                        <div className={styles.eye_icon}></div>
                        <span>{views}</span>
                    </div>
                    <div></div>
                    <div>
                        <span>2022-00-00</span>
                    </div>
                </div>
            </div>
            <div className={styles.workbook_element_title_container}>
                <span>{question}</span>
            </div>
            <div className={styles.workbook_keyword_container}>
                {keywords ? keywords.map((data:string, index:number) => {
                    if(data){
                        return <KeywordElement key={index} keywordTitle={data}/>
                    }
                }) : null}
            </div>
        </div>
    )
}

export default WorkbookElement;
