import {combineReducers} from 'redux';
import authReducer from './auth/authReducer';
import menuElementClickReducer from './workbook/sidebarmenu/menuElementClickReducer';
import childMenuClickReducer from './workbook/sidebarmenu/childMenuClickReducer';
import filterClickReducer from './workbook/listview/filterClickReducer';
import shareWorkbookClickReducer from './workbook/workbook-detail/shareWorkbookClickReducer';

const rootReducer = combineReducers({
    authReducer,
    menuElementClickReducer,
    childMenuClickReducer,
    filterClickReducer,
    shareWorkbookClickReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
