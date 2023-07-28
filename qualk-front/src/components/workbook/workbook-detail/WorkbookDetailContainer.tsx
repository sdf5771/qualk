import React, {useState, useEffect} from 'react';
import WorkbookDetailPresenter from "./WorkbookDetailPresenter";
import {useNavigate, useLocation, NavigateFunction, Location} from "react-router-dom";
import {useQuery} from '@tanstack/react-query';
import getQuestionDetailData from 'queries/workbook/workbook-detail/getQuestionDetailData';
import useTransLanguageQuizData from 'hook/useTransLanguageQuizData';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers/reducers';

function WorkbookDetailContainer(){
    const navigate: NavigateFunction = useNavigate();
    const location: Location = useLocation();
    const dispatch = useDispatch();
    const questionData = location.pathname.split('/');
    const questionType = questionData[2]
    const questionId = questionData[3];
    const {isTransfer} = useSelector((state: RootState) => state.transferWorkbookData);
    const { isLoading: engLangIsLoading, isError: engLangIsError, data: engLangData, error: engLangError, refetch: engLangRefetch } = useTransLanguageQuizData({lang: "English", testId: questionId, type: questionType});
    const { isLoading: korLangIsLoading, isError: korLangIsError, data: korLangData, error: korLangError, refetch: korLangRefetch } = useTransLanguageQuizData({lang: "Korea", testId: questionId, type: questionType});
    
    // 문제 상세보기 컴포넌트가 unmount되면 global state에 isTransfer를 English로 다시 변경
    useEffect(() => {
        return () => {
            dispatch({type: 'English'})
        }
    }, [])

    return(
        <WorkbookDetailPresenter navigate={navigate} location={location} workbookData={isTransfer === false ? engLangData : korLangData} />
    )
}

export default WorkbookDetailContainer;
