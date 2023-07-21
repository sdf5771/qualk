import { UseMutateFunction } from "@tanstack/react-query";

type initialState = { modalStateId: number, navLocation?: string, navigationState?: {
    testIndex: number;
    testId: string;
    totalIndex: number;
    prevPathName: string;
    testTime?: number;
}, mutateFunc?: UseMutateFunction };

export type actionType = {type: string, navLocation?: string, navigationState?: {
    testIndex: number;
    testId: string;
    totalIndex: number;
    prevPathName: string;
    testTime?: number;
}, mutateFunc?: UseMutateFunction};

function workbookModalReducer<T, U>(currentState: initialState, action: actionType){
    if(currentState === undefined){
        return { modalStateId: 0 };
    }
    const newState = {...currentState};

    switch (action.type){
        case 'WorkbookModalClose':
            newState.modalStateId = 0;
            break

        case 'shareWorkbookClick':
            newState.modalStateId = 1;
            break
        case 'okCancelModalOpen':
            newState.modalStateId = 2;
            newState.navLocation = action.navLocation;
            newState.navigationState = action.navigationState;
            newState.mutateFunc = action.mutateFunc;
            break
    }

    return newState
}

export default workbookModalReducer;
