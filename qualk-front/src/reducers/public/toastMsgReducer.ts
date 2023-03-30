type initialState = {isToast: boolean, toastMsg: string, toastType : string};

export type actionType = {type: string, toastMsg: string, toastType : string};

function toastMsgReducer(currentState: initialState, action: actionType){
    if(currentState === undefined){
        return {isToast:false, toastMsg: '', toastType: 'check'};
    }

    const newState = {...currentState};

    if(action.type === 'toast open'){
        newState.isToast = true;
        newState.toastMsg = action.toastMsg;
        newState.toastType = action.toastType;
    } else if(action.type === 'toast close'){
        newState.isToast = false;
        newState.toastMsg = action.toastMsg;
        newState.toastType = action.toastType;
    }

    return newState;
}

export default toastMsgReducer;
