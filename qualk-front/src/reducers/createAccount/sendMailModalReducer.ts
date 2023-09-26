type initialState = {isOpen: boolean};

export type actionType = {type: string};

function sendMailModalReducer(currentState: initialState, action: actionType){
    if(currentState === undefined){
        return {isOpen: false};
    }

    let newState = currentState;
    
    if(action.type === 'sendmail modal open'){
        newState.isOpen = true;
    } else if(action.type === 'sendmail modal close'){
        newState.isOpen = false;
    }
    
    return newState;
}

export default sendMailModalReducer;
