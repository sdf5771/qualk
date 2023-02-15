import React, {ReactEventHandler, useEffect} from 'react';
import styles from './MenuElementPresenter.module.css'

type MenuElementType = {
    menuName: string,
    onClickHandler: ReactEventHandler,
    isActive: boolean,
}

function MenuElementPresenter({menuName, onClickHandler, isActive}:MenuElementType){
    console.log('isActive ', isActive);

    return(
      <div className={`${styles.menu_element_root} ${isActive ? styles.active : null}`} onClick={onClickHandler}>
          <span>{menuName}</span>
      </div>
    );
}

export default MenuElementPresenter;
