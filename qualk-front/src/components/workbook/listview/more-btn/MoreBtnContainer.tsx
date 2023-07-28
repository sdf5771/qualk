import React from 'react';
import MoreBtnPresenter from "./MoreBtnPresenter";

type MoreBtnContainerPropsType = {
    filterActive: string,
    currentPage: number,
    setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>,
}

function MoreBtnContainer({filterActive, currentPage, setCurrentPageNumber}: MoreBtnContainerPropsType){
    const onClickHandler = (event:React.MouseEvent) => {
        if(setCurrentPageNumber){
            setCurrentPageNumber(currentPage + 1)
        }
    }

    return(
        <MoreBtnPresenter onClickHandler={onClickHandler} />
    )
}

export default MoreBtnContainer;
