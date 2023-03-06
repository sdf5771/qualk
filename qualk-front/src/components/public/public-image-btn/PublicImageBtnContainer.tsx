import React, {ReactEventHandler} from 'react';
import PublicImageBtnPresenter from "./PublicImageBtnPresenter";

type LogoIconSvgType = {
    default: React.SVGProps<SVGElement>,
    hover: React.SVGProps<SVGElement>,
    active: React.SVGProps<SVGElement>,
}

type OptionsType = {
    border?: boolean,
}

type PublicImageBtnContainerPropsType = {
    btnText: string,
    logoIcon: LogoIconSvgType,
    btnClickEventHandler: ReactEventHandler,
    options?: OptionsType,
}

function PublicImageBtnContainer({btnText, logoIcon, btnClickEventHandler, options}: PublicImageBtnContainerPropsType) {
    console.log('logoIcon ', logoIcon)

    return(
        <PublicImageBtnPresenter />
    )
}

export default PublicImageBtnContainer;
