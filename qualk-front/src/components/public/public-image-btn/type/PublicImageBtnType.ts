import React, {ReactEventHandler} from "react";

export type LogoIconSvgType = {
    default: React.ReactNode,
    hover?: React.ReactNode,
    active?: React.ReactNode,
    // default: React.SVGProps<SVGElement>,
    // hover?: React.SVGProps<SVGElement>,
    // active?: React.SVGProps<SVGElement>,
}

export type OptionsType = {
    border?: boolean,
}

export type PublicImageBtnContainerPropsType = {
    btnText: string,
    logoIcon: LogoIconSvgType,
    btnClickEventHandler?: ReactEventHandler,
    options?: OptionsType,
}

export type PublicImageBtnPresenterPropsType = {
    btnText: string,
    logoIcon: LogoIconSvgType,
    btnClickEventHandler?: ReactEventHandler,
    btnMouseOverEventHandler: ReactEventHandler,
    btnMouseOutEventHandler: ReactEventHandler,
    isHover: boolean,
    options?: OptionsType,
}
