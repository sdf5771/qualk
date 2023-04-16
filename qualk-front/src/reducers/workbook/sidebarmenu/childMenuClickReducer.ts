type initialState = {activeMenu: string, activeMenuId: number | null};

type actionType = {type: string, menuId: number, menuName: string};

function childMenuClickReducer<T, U>(currentState: initialState, action: actionType){
    const quizTypePath = window.location.href.split('/')[4]

    if(quizTypePath == 'gaiq' || quizTypePath == 'GAIQ'){
        return {activeMenu: 'GAIQ', activeMenuId: 0};
    } else if (quizTypePath == 'sqid' || quizTypePath == 'SQID'){
        return {activeMenu: 'SQID', activeMenuId: 1};
    } else if (quizTypePath == 'sqld' || quizTypePath == 'SQLD'){
        return {activeMenu: 'SQLD', activeMenuId: 2};
    }

    if(currentState === undefined){
        return {activeMenu: 'GAIQ', activeMenuId: 0};
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
