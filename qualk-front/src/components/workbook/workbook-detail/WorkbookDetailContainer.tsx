import React from 'react';
import WorkbookDetailPresenter from "./WorkbookDetailPresenter";
import {useNavigate, useLocation, NavigateFunction, Location} from "react-router-dom";
import {useQuery} from '@tanstack/react-query';
import getQuestionDetailData from 'queries/workbook/workbook-detail/getQuestionDetailData';

function WorkbookDetailContainer(){
    const navigate: NavigateFunction = useNavigate();
    const location: Location = useLocation();
    const questionData = location.pathname.split('/')[2].split('&');
    const questionType = questionData[0]
    const questionId = questionData[1];
    const { isLoading: detailIsLoading, isError: detailIsError, data: detailData, error: detailError } = useQuery( ['workbook-detail', questionId, questionType], () => getQuestionDetailData(parseInt(questionId), questionType, navigate));

    return(
        <WorkbookDetailPresenter navigate={navigate} location={location} workbookData={detailData ? detailData['0'] : undefined} />
    )
}

export default WorkbookDetailContainer;
