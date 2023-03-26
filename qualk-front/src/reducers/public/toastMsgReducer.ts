type initialState = {isToast: boolean, toastMsg: string};

export type actionType = {type: string, toastMsg: string};

function toastMsgReducer(currentState: initialState, action: actionType){
    if(currentState === undefined){
        return {isToast:false, toastMsg: ''};
    }

    const newState = {...currentState};

    if(action.type === 'toast open'){
        newState.isToast = true;
        newState.toastMsg = action.toastMsg;
    } else if(action.type === 'toast close'){
        newState.isToast = false;
        newState.toastMsg = action.toastMsg;
    }

    return newState;
}

export default toastMsgReducer;
