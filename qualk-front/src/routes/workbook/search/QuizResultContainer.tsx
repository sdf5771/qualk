import React from 'react';
import {useNavigate} from 'react-router-dom';
import styles from "stylesheets/workbook/search/QuizSearch.module.css";
import publicScrollbar from 'stylesheets/public/scrollbar.module.css'
import {QuizResultContainerPropsType} from './type/QuizResultContainerPropsType'
import {useQuery} from "@tanstack/react-query";
import WorkbookElement from 'components/workbook/listview/WorkbookElement';
import {WorkbookDataType} from 'components/workbook/type/WorkbookDataType';
import getSearchResult from "queries/workbook/search/getSearchResult";

function QuizResultContainer({containerType, containerTitle, searchData, searchType, searchKeyword}: QuizResultContainerPropsType){
    const navigate = useNavigate();
    return(
        <div className={styles.result_container}>
            <div className={styles.result_header}>
                <div className={styles.result_title}>
                    <span>{containerTitle}</span>
                    <span>{searchData ? searchData.length : 0}</span>
                </div>
                {searchType == "all" ?
                    <div className={styles.btn_container}
                         onClick={() => navigate(`/quiz/search?keyword=${searchKeyword}&type=${containerType}`)}>
                        <span>전체보기</span>
                    </div> : null
                }

            </div>
            <div className={styles.quiz_container}>
                {searchData ? searchData.map((data: WorkbookDataType, index: number) => {
                    return <WorkbookElement
                        key={`${data['question_type']}-${data['question_id']}`}
                        question_id={data['question_id']}
                        question_type={data['question_type']}
                        question_name={data['question_name']}
                        question_view={data['question_view']}
                        question_create={data['question_create']}
                        question_tag={data['question_tag']}
                    />
                }) : null}
            </div>
        </div>
    )
}

export default QuizResultContainer;
