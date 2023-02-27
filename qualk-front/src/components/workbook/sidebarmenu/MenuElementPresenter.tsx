import React, {ReactEventHandler, useEffect} from 'react';
import styles from './MenuElementPresenter.module.css'
import ChildMenuComponent from "./ChildMenuComponent";
import {ReactComponent as DataAnalysisLogo} from 'assets/images/workbook/listview/sidebarmenu/dataanalysis_logo.svg'
import {ReactComponent as DeveloperLogo} from 'assets/images/workbook/listview/sidebarmenu/developer_logo.svg'
import {ReactComponent as DesignerLogo} from 'assets/images/workbook/listview/sidebarmenu/designer_logo.svg'

type MenuElementType = {
    menuName: string,
    onClickHandler: ReactEventHandler,
    isActive: boolean,
    childMenu: string[],
}

function MenuElementPresenter({menuName, onClickHandler, isActive, childMenu}:MenuElementType){
    let logo
    if(menuName === 'Data Analysis'){
        logo = <DataAnalysisLogo className={styles.logo} />
    } else if(menuName === 'Developer'){
        logo = <DeveloperLogo className={styles.logo} />
    } else if(menuName === 'Designer'){
        logo = <DesignerLogo className={styles.logo} />
    }

    return(
      <div className={styles.menu_element_container}>
          <div className={`${styles.menu_element_root} ${isActive ? styles.active : null}`} onClick={onClickHandler}>
              {logo}
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
