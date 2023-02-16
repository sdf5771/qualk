type initialState = {isActive: boolean, menuId: number | null};

type actionType = {type: string, isActive: boolean, menuId: number};

function menuElementClickReducer<T, U>(currentState: initialState, action: actionType){
    if(currentState === undefined){
        return {isActive: true, menuId: 1};
    }
    const newState = {...currentState};

    switch (action.type){
        case 'click':
            newState.isActive = action.isActive;
            newState.menuId = action.menuId;
            break
    }

    return newState
}

export default menuElementClickReducer;
