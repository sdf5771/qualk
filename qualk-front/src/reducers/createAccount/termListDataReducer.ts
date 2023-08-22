import { TtermData, termData } from "javascripts/termData";

type initialState = TtermData[];

export type actionType = {type: string, termListData: TtermData[]};

function termListDataReducer(currentState: initialState, action: actionType){
    if(currentState === undefined){
        return termData;
    }

    let newState = currentState;
    
    if(action.type === 'termListData mutate'){
        newState = action.termListData;
    }
    
    return newState;
}

export default termListDataReducer;
