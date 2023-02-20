import React, {ReactEventHandler, useEffect} from 'react';
import styles from './MenuElementPresenter.module.css'
import ChildMenuComponent from "./ChildMenuComponent";

type MenuElementType = {
    menuName: string,
    onClickHandler: ReactEventHandler,
    isActive: boolean,
    childMenu: string[],
}

function MenuElementPresenter({menuName, onClickHandler, isActive, childMenu}:MenuElementType){
    return(
      <div className={styles.menu_element_container}>
          <div className={`${styles.menu_element_root} ${isActive ? styles.active : null}`} onClick={onClickHandler}>
              <span>{menuName}</span>
          </div>
          <div className={styles.child_menu_container}>
              {isActive ? childMenu.map((child:string, index: number) => {
                  return <ChildMenuComponent key={index} childMenuIndex={index} childMenuName={child}/>
              }) : null}
          </div>
      </div>
    );
}

export default MenuElementPresenter;
