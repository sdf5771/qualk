import React from 'react';
import WorkbookDetailPresenter from "./WorkbookDetailPresenter";
import {useNavigate, useLocation, NavigateFunction, Location} from "react-router-dom";
import {useQuery} from '@tanstack/react-query';
import getQuestionDetailData from 'queries/workbook/workbook-detail/getQuestionDetailData';
import useTransLanguageQuizData from 'hook/useTransLanguageQuizData';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers/reducers';

function WorkbookDetailContainer(){
    const navigate: NavigateFunction = useNavigate();
    const location: Location = useLocation();
    const questionData = location.pathname.split('/');
    const questionType = questionData[2]
    const questionId = questionData[3];
    const {isTransfer} = useSelector((state: RootState) => state.transferWorkbookData);
    // const { isLoading: detailIsLoading, isError: detailIsError, data: detailData, error: detailError } = useQuery( ['workbook-detail', questionId, questionType], () => getQuestionDetailData(parseInt(questionId), questionType, navigate));
    const { isLoading: engLangIsLoading, isError: engLangIsError, data: engLangData, error: engLangError, refetch: engLangRefetch } = useTransLanguageQuizData({lang: "Korea", testId: questionId, type: questionType});
    const { isLoading: korLangIsLoading, isError: korLangIsError, data: korLangData, error: korLangError, refetch: korLangRefetch } = useTransLanguageQuizData({lang: "English", testId: questionId, type: questionType});
    console.log('engLangData ', engLangData);
    return(
        <WorkbookDetailPresenter navigate={navigate} location={location} workbookData={!isTransfer ? engLangData? engLangData : undefined : korLangData} />
    )
}

export default WorkbookDetailContainer;
