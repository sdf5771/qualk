type initialState = {isOpen: boolean};

export type actionType = {type: string};

function findPasswordModalReducer(currentState: initialState, action: actionType){
    if(currentState === undefined){
        return {isOpen:false};
    }

    const newState = {...currentState};

    if(action.type === 'find password modal open'){
        newState.isOpen = true;
    } else if(action.type === 'find password modal close'){
        newState.isOpen = false;
    }

    return newState;
}

export default findPasswordModalReducer;
