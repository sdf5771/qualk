import {combineReducers} from 'redux';
import authReducer from './auth/authReducer';
import menuElementClickReducer from './workbook/sidebarmenu/menuElementClickReducer';
import childMenuClickReducer from './workbook/sidebarmenu/childMenuClickReducer';
import filterClickReducer from './workbook/listview/filterClickReducer';

const rootReducer = combineReducers({
    authReducer,
    menuElementClickReducer,
    childMenuClickReducer,
    filterClickReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
