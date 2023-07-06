import React, {ReactEventHandler} from 'react';
import styles from './SideBarMenuPresenter.module.css'
import MenuElementContainer from "./MenuElementContainer";

const menuData = [
    {
        menuId: 1,
        menuName: 'Data Analysis',
        childMenu: [
            {childMenuId: 'DA_GAIQ', childMenuName: 'GAIQ'}, 
            {childMenuId: 'DA_SQID', childMenuName: 'SQID'}, 
            {childMenuId: 'DA_SQLD', childMenuName: 'SQLD'}
        ],
    },
    {
        menuId: 2,
        menuName: 'Test',
        childMenu: [
            {childMenuId: 'Test_GAIQ', childMenuName: 'GAIQ'}, 
            {childMenuId: 'Test_SQID', childMenuName: 'SQID'}, 
            {childMenuId: 'Test_SQLD', childMenuName: 'SQLD'}
        ],
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
//         menuName: 'Test',
//         childMenu: ['GAIQ', 'SQID', 'SQLD'],
//     }
// ]

type menuDataType = {
    menuId: number, 
    menuName: string, 
    childMenu: {
        childMenuId: string,
        childMenuName: string,
    }[]
}

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
            {/* <div className={styles.banner_container}>
                <div onClick={bannerOnClickHandler} className={styles.qualk_banner}></div>
            </div> */}
        </div>
    );
}

export default SideBarPresenter;
