import React from 'react';
import MoreBtnPresenter from "./MoreBtnPresenter";

type MoreBtnContainerPropsType = {
    filterActive: string,
    lastIndex: number,
    setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>,
}

function MoreBtnContainer({filterActive, lastIndex, setCurrentPageNumber}: MoreBtnContainerPropsType){
    const onClickHandler = (event:React.MouseEvent) => {
        if(setCurrentPageNumber){
            setCurrentPageNumber(lastIndex)
        }

    }

    return(
        <MoreBtnPresenter onClickHandler={onClickHandler} />
    )
}

export default MoreBtnContainer;
