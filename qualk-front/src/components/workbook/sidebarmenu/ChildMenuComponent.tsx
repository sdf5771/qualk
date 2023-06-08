import React, {useState, useEffect} from 'react';
import styles from './ChildMenuComponent.module.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "reducers/reducers";
import {useLocation, useNavigate} from "react-router-dom";

type ChildMenuComponentPropsType = {
    parentMenuName: string,
    childMenuName: string,
    childMenuId: string,
}

function ChildMenuComponent({parentMenuName, childMenuName, childMenuId}: ChildMenuComponentPropsType){
    const location = useLocation();
    const navigate = useNavigate();
    const childMenuClickSelector = useSelector((state: RootState) => state.childMenuClickReducer)
    const childMenuClickDispatch = useDispatch();
    const [isActive, setIsActive] = useState(false);

    const onClickHandler = (event:React.MouseEvent) => {
        // URL 작업 전 임시 조치
        // if(location.pathname !== "/workbook"){
        //     navigate('/workbook')
        // }
        
        if(parentMenuName === 'Test'){
            navigate(`/quiz/test/${childMenuName.toLowerCase()}`);
        } else {
            navigate(`/quiz/${childMenuName.toLowerCase()}`);
        }

        childMenuClickDispatch({type: 'childMenuClick', parentMenuName: parentMenuName, menuName: childMenuName, menuId: childMenuId})
    }

    useEffect(() => {
        if(childMenuClickSelector['activeMenuId'] === childMenuId){
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [childMenuClickSelector['activeMenuId']])

    return(
        <div className={`${styles.child_menu_root} ${isActive ? styles.active : ''}`} onClick={onClickHandler}>
            <span>{childMenuName}</span>
        </div>
    );
}

export default ChildMenuComponent;
