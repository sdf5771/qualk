const initialState = {activeMenu: 'Developer', activeMenuId: 1};

type actionType = {type: string, menuId: number, menuName: string};

function menuElementClickReducer<T, U>(currentState: typeof initialState, action: actionType){
    if(currentState === undefined){
        return {activeMenu: 'Developer', activeMenuId: 1};
    }
    const newState = {...currentState};

    switch (action.type){
        case 'click':
            newState.activeMenu = action.menuName;
            newState.activeMenuId = action.menuId;
            break
    }

    return newState
}

export default menuElementClickReducer;
