type initialState = {activeMenu: string, activeMenuId: number | null};

type actionType = {type: string, menuId: number, menuName: string};

function childMenuClickReducer<T, U>(currentState: initialState, action: actionType){
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
