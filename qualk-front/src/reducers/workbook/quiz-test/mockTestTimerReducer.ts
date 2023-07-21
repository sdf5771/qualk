type initialState = {minute: number, second: number};

type actionType = {type: string, minute: number, second: number};

function mockTestTimerReducer<T, U>(currentState: initialState, action: actionType){
    if(currentState === undefined){
        return {minute: 0, second: 0};
    }
    const newState = {...currentState};

    switch (action.type){
        case 'AddInteval':
            newState.minute = action.minute;
            newState.second = action.second;
            break
        case 'initialize':

            break
        case 'intervalEnd':

            break
    }

    return newState
}

export default mockTestTimerReducer;
