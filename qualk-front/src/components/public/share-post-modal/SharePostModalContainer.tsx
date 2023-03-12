import React from 'react';
import SharePostModalPresenter from "./SharePostModalPresenter";
import {useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";

function SharePostModalContainer(){
    const NOW_URL_PATH = window.location.href;
    const dispatch = useDispatch();

    const modalCloseOnClickHandler = (event: React.MouseEvent) => {
        dispatch({type: 'shareWorkbookModalClose', modalStateId: 0})
    }

    const handleCopyClipBoard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            alert('클립보드에 링크가 복사되었습니다.');
        } catch (e) {
            alert('복사에 실패하였습니다');
        }
    };

    const copyOnClickHandler = async (event: React.MouseEvent) => {
        handleCopyClipBoard(NOW_URL_PATH);
    }

    return(
        <SharePostModalPresenter modalCloseOnClickHandler={modalCloseOnClickHandler} copyOnClickHandler={copyOnClickHandler} urlPath={NOW_URL_PATH}/>
    );
}

export default SharePostModalContainer;
