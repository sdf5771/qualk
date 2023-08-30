type initialState = {isOpen: boolean, title: string, content : string};

export type actionType = {type: string, title: string, content : string};

function termModalReducer(currentState: initialState, action: actionType){
    if(currentState === undefined){
        return {isOpen:false, title: '', detail: 'check'};
    }

    const newState = {...currentState};

    if(action.type === 'term modal open'){
        newState.isOpen = true;
        newState.title = action.title;
        newState.content = action.content;
    } else if(action.type === 'term modal close'){
        newState.isOpen = false;
        newState.title = action.title;
        newState.content = action.content;
    }

    return newState;
}

export default termModalReducer;
