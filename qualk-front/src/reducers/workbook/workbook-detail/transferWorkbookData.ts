type initialState = { isTransfer: boolean };

export type actionType = {type: string, };

function transferWorkbookData<T, U>(currentState: initialState, action: actionType){
    if(currentState === undefined){
        return { isTransfer: false };
    }
    const newState = {...currentState};

    switch (action.type){
        case 'Korea':
            newState.isTransfer = true;
            break

        case 'English':
            newState.isTransfer = false;
            break
        
    }

    return newState
}

export default transferWorkbookData;
