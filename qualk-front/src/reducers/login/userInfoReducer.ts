type initialState = {
    userEmail: string;
};

export type actionType = {type: string, userEmail: string};

function userInfoReducer(currentState: initialState, action: actionType){
    if(currentState === undefined){
        return {userEmail: ''};
    }

    const newState = {...currentState};

    if(action.type === 'Update userInfo'){
        newState.userEmail = action.userEmail;
    }

    return newState;
}

export default userInfoReducer;
