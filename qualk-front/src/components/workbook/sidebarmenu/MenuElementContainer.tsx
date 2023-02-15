import React, {useEffect, useState} from 'react';
import MenuElementPresenter from "./MenuElementPresenter";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "reducers/reducers";


type MenuElementType = {
    menuId: number;
    menuName: string,
}

function MenuElementContainer(props: MenuElementType){
    const menuElementActivateSelector = useSelector((state:RootState) => state.menuElementClickReducer);
    const [isActive, setIsActive] = useState(false);
    const menuElementClickDispatch = useDispatch();

    //menu onClick handle function
    const onClickHandler = (event: React.MouseEvent) => {
        console.log(event.target);
        menuElementClickDispatch({type: 'click', menuId: props.menuId, menuName: props.menuName})
    }

    // toggle active menu
    useEffect(() => {
        if(menuElementActivateSelector){
            if(menuElementActivateSelector['activeMenuId'] === props.menuId){
                setIsActive(true);
            } else {
                setIsActive(false);
            }
        }
    },[menuElementActivateSelector['activeMenuId']])

    return(
        <MenuElementPresenter menuName={props.menuName} onClickHandler={onClickHandler} isActive={isActive}/>
    );
}

export default MenuElementContainer;
