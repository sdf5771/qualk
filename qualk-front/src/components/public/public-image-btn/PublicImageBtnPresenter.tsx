import React from 'react';
import styles from './PublicImageBtnPresenter.module.css';
import {PublicImageBtnPresenterPropsType} from './type/PublicImageBtnType';

function PublicImageBtnPresenter({btnText, logoIcon, btnClickEventHandler, btnMouseOverEventHandler, btnMouseOutEventHandler, isHover, options}: PublicImageBtnPresenterPropsType){

    return(
        <div onMouseOver={btnMouseOverEventHandler}
             onMouseOut={btnMouseOutEventHandler}
             onClick={btnClickEventHandler}
             className={`${styles.public_btn_root} ${options && options.border ? styles.border : styles.no_border}`}>
            <div className={styles.icon_container}>{isHover ? logoIcon.hover : logoIcon.default}</div>
            <span>{btnText}</span>
        </div>
    )
}

export default PublicImageBtnPresenter;
