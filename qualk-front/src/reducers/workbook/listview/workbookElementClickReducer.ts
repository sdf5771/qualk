type initialState = {questionType: string, questionId: number};

type actionType = {type: string, questionType: string, questionId: number};

function workbookElementClickReducer<T, U>(currentState: initialState, action: actionType){
    if(currentState === undefined){
        return {questionType: '', questionId: 0};
    }
    const newState = {...currentState};

    switch (action.type){
        case 'workbookElementClick':
            newState.questionType = action.questionType;
            newState.questionId = action.questionId;
            break
    }

    return newState
}

export default workbookElementClickReducer;
