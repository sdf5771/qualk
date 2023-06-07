type initialState = {activeMenu: string, activeMenuId: number | null};

type actionType = {type: string, parentMenuName: string, menuId: number, menuName: string};

function childMenuClickReducer<T, U>(currentState: initialState, action: actionType){
    // const quizTypePath = window.location.href.split('/')[4]
    // console.log('window.location.href.split ', window.location.href.split('/'))
    
    // if(quizTypePath == 'gaiq' || quizTypePath == 'GAIQ'){
    //     return {parentMenuName: window.location.href.split('/')[3], activeMenu: 'GAIQ', activeMenuId: 0};
    // } else if (quizTypePath == 'sqid' || quizTypePath == 'SQID'){
    //     return {parentMenuName: window.location.href.split('/')[3], activeMenu: 'SQID', activeMenuId: 1};
    // } else if (quizTypePath == 'sqld' || quizTypePath == 'SQLD'){
    //     return {parentMenuName: window.location.href.split('/')[3], activeMenu: 'SQLD', activeMenuId: 2};
    // } 
    
    if(currentState === undefined){
        return {activeMenu: 'GAIQ', activeMenuId: 0};
    }
    const newState = {...currentState};

    switch (action.type){
        case 'childMenuClick':
            newState.activeMenu = action.menuName;
            newState.activeMenuId = action.menuId;
            break
    }

    return newState
}

export default childMenuClickReducer;
