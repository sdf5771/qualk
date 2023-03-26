import React, {ReactEventHandler} from 'react';
import styles from './SideBarMenuPresenter.module.css'
import MenuElementContainer from "./MenuElementContainer";

const menuData = [
    {
        menuId: 1,
        menuName: 'Data Analysis',
        childMenu: ['GAIQ', 'SQID', 'SQLD'],
    }
]

// const menuData = [
//     {
//         menuId: 1,
//         menuName: 'Data Analysis',
//         childMenu: ['GAIQ', 'SQID', 'SQLD'],
//     },
//     {
//         menuId: 2,
//         menuName: 'Developer',
//         childMenu: ['Code Test', 'Test Category', 'Test Develop'],
//     },
//     {
//         menuId: 3,
//         menuName: 'Designer',
//         childMenu: ['Design01', 'Design02', 'Design03'],
//     }
// ]

type menuDataType = {menuId: number, menuName: string, childMenu: string[]}

type SideBarPresenterPropsType = {
    bannerOnClickHandler: ReactEventHandler,
}

function SideBarPresenter({bannerOnClickHandler} : SideBarPresenterPropsType){
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
                <div onClick={bannerOnClickHandler} className={styles.qualk_banner}></div>
            </div>
        </div>
    );
}

export default SideBarPresenter;
