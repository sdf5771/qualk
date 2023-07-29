import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import styles from "stylesheets/workbook/search/QuizSearch.module.css";
import publicScrollbar from 'stylesheets/public/scrollbar.module.css'
import {QuizResultContainerPropsType} from './type/QuizResultContainerPropsType'
import {useQuery} from "@tanstack/react-query";
import WorkbookElement from 'components/workbook/listview/WorkbookElement';
import {WorkbookDataType} from 'components/workbook/type/WorkbookDataType';
import getSearchResult from "queries/workbook/search/getSearchResult";

function QuizResultContainer({containerType, containerTitle, searchData, searchType, searchKeyword}: QuizResultContainerPropsType){
    const navigate = useNavigate();
    const location = useLocation();
    let renderCount = 0
    const maximumRenderCount = 3

    return(
        <div className={styles.result_container}>
            <div className={styles.result_header}>
                <div className={styles.result_title}>
                    <span>{containerTitle}</span>
                    <span>{searchData ? searchData.length : 0}</span>
                </div>
                {searchType == "all" ?
                    <div className={styles.btn_container}
                         onClick={() => navigate(`/quiz/search?keyword=${searchKeyword}&type=${containerType}`, {state: {beforeLocation: location.pathname + location.search}})}>
                        <span>전체보기</span>
                    </div> : null
                }

            </div>
            <div className={styles.quiz_container}>
                {searchData ? searchData.map((data: WorkbookDataType, index: number) => {

                    renderCount++;

                    if(searchType == 'all' && renderCount > maximumRenderCount){
                        return null
                    }

                    return <WorkbookElement
                        key={`${data.type}-${data.contentId}`}
                        contentId={data.contentId}
                        type={data.type}
                        title={data.title}
                        view={data.view}
                        create={data.create}
                        tag={data.tag}
                    />
                }) : null}
            </div>
        </div>
    )
}

export default QuizResultContainer;
