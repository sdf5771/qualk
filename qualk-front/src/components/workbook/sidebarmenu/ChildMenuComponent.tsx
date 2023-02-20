import React, {useState, useEffect} from 'react';
import styles from './ChildMenuComponent.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../reducers/reducers";

type ChildMenuComponentPropsType = {
    childMenuName: string,
    childMenuIndex: number,
}

function ChildMenuComponent({childMenuName, childMenuIndex}: ChildMenuComponentPropsType){
    const childMenuClickSelector = useSelector((state: RootState) => state.childMenuClickReducer)
    const childMenuClickDispatch = useDispatch();
    const [isActive, setIsActive] = useState(false);

    const onClickHandler = (event:React.MouseEvent) => {
        childMenuClickDispatch({type: 'childMenuClick', menuName: childMenuName, menuId: childMenuIndex})
    }

    useEffect(() => {
        if(childMenuClickSelector['activeMenu'] === childMenuName){
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [childMenuClickSelector['activeMenu']])

    return(
        <div className={`${styles.child_menu_root} ${isActive ? styles.active : ''}`} onClick={onClickHandler}>
            <span>{childMenuName}</span>
        </div>
    );
}

export default ChildMenuComponent;
