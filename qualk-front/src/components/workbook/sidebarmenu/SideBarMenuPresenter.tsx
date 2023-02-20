import React from 'react';
import styles from './SideBarMenuPresenter.module.css'
import MenuElementContainer from "./MenuElementContainer";

const menuData = [
    {
        menuId: 1,
        menuName: 'Data Analysis',
        childMenu: ['GAIQ', 'SQID', 'SQLD'],
    },
    {
        menuId: 2,
        menuName: 'Developer',
        childMenu: ['Code Test', 'Test Category', 'Test Develop'],
    }
]

type menuDataType = {menuId: number, menuName: string, childMenu: string[]}

function SideBarPresenter(){
    return(
        <div className={styles.side_bar_main}>
            <div className={styles.menu_container}>
                { Array.isArray(menuData) ? menuData.map( (menu: menuDataType) => {
                    if(menu){
                        return <MenuElementContainer
                            key={menu.menuId}
                            menuId={menu.menuId}
                            menuName={menu.menuName}
                            childMenu={menu.childMenu}
                        />
                    }
                } ) : null}
            </div>
            <div className={styles.banner_container}>
                <div className={styles.qualk_banner}></div>
            </div>
        </div>
    );
}

export default SideBarPresenter;
