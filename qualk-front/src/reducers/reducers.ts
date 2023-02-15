import {combineReducers} from 'redux';
import authReducer from './auth/authReducer';
import menuElementClickReducer from './workbook/sidebarmenu/menuElementClickReducer';

const rootReducer = combineReducers({
    authReducer,
    menuElementClickReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
