import React, {ReactEventHandler, useState} from 'react';
import PublicImageBtnPresenter from "./PublicImageBtnPresenter";
import {PublicImageBtnContainerPropsType} from './type/PublicImageBtnType';


function PublicImageBtnContainer({btnText, logoIcon, btnClickEventHandler, options}: PublicImageBtnContainerPropsType) {
    const [isHover, setIsHover] = useState(false);
    const onMouseOverHandler = (event: React.MouseEvent) => {
        setIsHover(true)
    }

    const onMouseOutHandler = (event: React.MouseEvent) => {
        setIsHover(false)
    }

    return(
        <PublicImageBtnPresenter
            btnText={btnText}
            logoIcon={logoIcon}
            btnClickEventHandler={btnClickEventHandler}
            btnMouseOverEventHandler={onMouseOverHandler}
            btnMouseOutEventHandler={onMouseOutHandler}
            isHover={isHover}
            options={options}
        />
    )
}

export default PublicImageBtnContainer;
