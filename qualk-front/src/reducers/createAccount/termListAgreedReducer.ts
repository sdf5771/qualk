type initialState = boolean;

export type actionType = {type: string};

function termListAgreedReducer(currentState: initialState, action: actionType){
    if(currentState === undefined){
        return false;
    }

    let newState = currentState;
    
    if(action.type === 'termList all agreed'){
        newState = true;
    } else if(action.type === 'termList not agreed'){
        newState = false;
    }
    
    return newState;
}

export default termListAgreedReducer;
