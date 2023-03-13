import React, {ReactEventHandler} from 'react';
import styles from './MorebtnPresenter.module.css';

type MoreBtnPresenterPropsType = {
    onClickHandler: ReactEventHandler,
}

function MoreBtnPresenter({onClickHandler}: MoreBtnPresenterPropsType){
    return(
        <div onClick={onClickHandler} className={styles.more_btn_root}>
            <span>더보기</span>
        </div>
    )
}

export default MoreBtnPresenter;
