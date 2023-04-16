import React, {ReactElement, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import MenuElementPresenter from "./MenuElementPresenter";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "reducers/reducers";

type MenuElementType = {
    menuId: number;
    menuName: string,
    childMenu: string[],
}

function MenuElementContainer(props: MenuElementType){
    const navigate = useNavigate();
    const menuElementActivateSelector = useSelector((state:RootState) => state.menuElementClickReducer);
    const [menuIsActive, setMenuIsActive] = useState(false);
    const menuElementClickDispatch = useDispatch();

    //menu onClick handle function
    const menuOnClickHandler = (event: React.MouseEvent) => {
        menuElementClickDispatch({type: 'menuElementClick', isActive: !menuIsActive, menuId: props.menuId})
    }

    // toggle active menu
    useEffect(() => {
        if(menuElementActivateSelector){
            if(menuElementActivateSelector['menuId'] === props.menuId){
                setMenuIsActive(menuElementActivateSelector['isActive']);
            }
        }
    },[menuElementActivateSelector['isActive'], menuElementActivateSelector['menuId']])

    return(
        <MenuElementPresenter menuName={props.menuName} onClickHandler={menuOnClickHandler} isActive={menuIsActive} childMenu={props.childMenu}/>
    );
}

export default MenuElementContainer;
