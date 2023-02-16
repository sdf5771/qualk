import {combineReducers} from 'redux';
import authReducer from './auth/authReducer';
import menuElementClickReducer from './workbook/sidebarmenu/menuElementClickReducer';
import childMenuClickReducer from './workbook/sidebarmenu/childMenuClickReducer';

const rootReducer = combineReducers({
    authReducer,
    menuElementClickReducer,
    childMenuClickReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
