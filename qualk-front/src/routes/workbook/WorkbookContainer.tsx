import React,{useEffect, useState} from 'react';
import WorkbookPresenter from "./WorkbookPresenter";
import {useNavigate, useLocation} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "reducers/reducers";
import { useMutation } from '@tanstack/react-query';
import deleteQuizData from 'queries/workbook/quiz-test/deleteQuizData';
import createQuizTest from 'queries/workbook/quiz-test/createQuizTest';

function WorkbookContainer(){
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [isSearchResultPage, setIsSearchResultPage] = useState(false);
    const { mutate: deleteQuiz } = useMutation(deleteQuizData);
    const { mutate: createQuiz } = useMutation(createQuizTest);
    const workbookModalSelector = useSelector((state: RootState) => state.workbookModalReducer)
    const {isToast, toastType, toastMsg} = useSelector((state: RootState) => state.toastMsgReducer);

    // 디자인 수정 이후 검색 결과 페이지에는 SNB를 사용하지 않고, Search Result의 상위 컴포넌트 상단에 검색창이 추가됨
    useEffect(() => {
        if(location.pathname === '/quiz/search'){
            setIsSearchResultPage(true)
        } else {
            setIsSearchResultPage(false);
        }
    }, [location.pathname])
    
    // 잘못된 경로로 접속할 경우 임시 redirect
    useEffect(() => {
        if(location.pathname.split('/')[2] != 'gaiq'
            && location.pathname.split('/')[2] != 'GAIQ'
            && location.pathname.split('/')[2] != 'sqld'
            && location.pathname.split('/')[2] != 'SQLD'
            && location.pathname.split('/')[2] != 'sqid'
            && location.pathname.split('/')[2] != 'SQID'
            && location.pathname.split('/')[2] != 'search'
            && location.pathname.split('/')[2] != 'test'
            ){
            navigate('/notfound')
        }
    }, [])
    return(
        <WorkbookPresenter
            navigate={navigate}
            dispatch={dispatch}
            location={location}
            modalState={workbookModalSelector ? workbookModalSelector : {modalStateId: 0}}
            toastType={toastType}
            isToast={isToast}
            toastMsg={toastMsg}
            deleteQuiz={deleteQuiz}
            createQuiz={createQuiz}
            isSearchResultPage={isSearchResultPage}
        />
    );
}

export default WorkbookContainer;
