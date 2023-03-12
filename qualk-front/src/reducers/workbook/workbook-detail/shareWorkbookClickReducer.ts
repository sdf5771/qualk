type initialState = { modalStateId: number };

export type actionType = {type: string, modalStateId: number};

function shareWorkbookClickReducer<T, U>(currentState: initialState, action: actionType){
    if(currentState === undefined){
        return { modalStateId: 0 };
    }
    const newState = {...currentState};

    switch (action.type){
        case 'shareWorkbookModalClose':
            newState.modalStateId = action.modalStateId;
            break

        case 'shareWorkbookClick':
            newState.modalStateId = action.modalStateId;
            break
    }

    return newState
}

export default shareWorkbookClickReducer;
