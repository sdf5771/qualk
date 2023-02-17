import React, {useEffect, useState} from 'react';
import MenuElementPresenter from "./MenuElementPresenter";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "reducers/reducers";

type MenuElementType = {
    menuId: number;
    menuName: string,
    childMenu: string[],
}

function MenuElementContainer(props: MenuElementType){
    const menuElementActivateSelector = useSelector((state:RootState) => state.menuElementClickReducer);
    const [isActive, setIsActive] = useState(false);
    const menuElementClickDispatch = useDispatch();

    //menu onClick handle function
    const onClickHandler = (event: React.MouseEvent) => {
        menuElementClickDispatch({type: 'menuElementClick', isActive: !isActive, menuId: props.menuId})
    }

    // toggle active menu
    useEffect(() => {
        if(menuElementActivateSelector){
            if(menuElementActivateSelector['menuId'] === props.menuId){
                setIsActive(menuElementActivateSelector['isActive']);
            }
        }
    },[menuElementActivateSelector['isActive'], menuElementActivateSelector['menuId']])

    return(
        <MenuElementPresenter menuName={props.menuName} onClickHandler={onClickHandler} isActive={isActive} childMenu={props.childMenu}/>
    );
}

export default MenuElementContainer;
