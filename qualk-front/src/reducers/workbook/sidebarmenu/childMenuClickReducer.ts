type initialState = {activeMenu: string, activeMenuId: string | null};

type actionType = {type: string, parentMenuName: string, menuId: string, menuName: string};

function childMenuClickReducer<T, U>(currentState: initialState, action: actionType){
    //(임시) 메뉴 active
    const quizTypePath = window.location.href.split('/')[4]
    
    if(quizTypePath == 'test'){
        const testTypePath = window.location.href.split('/')[5]
        return {parentMenuName: quizTypePath, activeMenu: `${testTypePath.toUpperCase()}`, activeMenuId: `Test_${testTypePath.toUpperCase()}`};
    } else {
        if(quizTypePath == 'gaiq' || quizTypePath == 'GAIQ'){
            return {parentMenuName: window.location.href.split('/')[3], activeMenu: 'GAIQ', activeMenuId: "DA_GAIQ"};
        } else if (quizTypePath == 'sqid' || quizTypePath == 'SQID'){
            return {parentMenuName: window.location.href.split('/')[3], activeMenu: 'SQID', activeMenuId: "DA_SQID"};
        } else if (quizTypePath == 'sqld' || quizTypePath == 'SQLD'){
            return {parentMenuName: window.location.href.split('/')[3], activeMenu: 'SQLD', activeMenuId: "DA_SQLD"};
        } 
    }
    
    if(currentState === undefined){
        return {activeMenu: 'GAIQ', activeMenuId: "DA_GAIQ"};
    }
    const newState = {...currentState};

    switch (action.type){
        case 'childMenuClick':
            newState.activeMenu = action.menuName;
            newState.activeMenuId = action.menuId;
            break
    }

    return newState
}

export default childMenuClickReducer;
