import React, {useState, useEffect} from 'react';
import styles from './ChildMenuComponent.module.css'
import {useSelector} from "react-redux";
import {RootState} from "../../../reducers/reducers";

type ChildMenuComponentPropsType = {
    childMenuName: string,
    childMenuIndex: number,
}

function ChildMenuComponent({childMenuName, childMenuIndex}: ChildMenuComponentPropsType){
    const childMenuClickSelector = useSelector((state: RootState) => state.childMenuClickReducer)
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if(childMenuClickSelector['activeMenu'] === childMenuName){
            setIsActive(!isActive);
        }
    }, [childMenuClickSelector['activeMenu']])

    return(
        <div className={`${styles.child_menu_root} ${isActive ? styles.active : ''}`}>
            <span>{childMenuName}</span>
        </div>
    );
}

export default ChildMenuComponent;
