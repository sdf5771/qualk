type initialState = {activeFilter: string};

type actionType = {type: string, activeFilter: string};

function filterClickReducer<T, U>(currentState: initialState, action: actionType){
    if(currentState === undefined){
        return {activeFilter: 'sortViewed'};
    }
    const newState = {...currentState};

    switch (action.type){
        case 'filterClick':
            newState.activeFilter = action.activeFilter;
            break
    }

    return newState
}

export default filterClickReducer;
