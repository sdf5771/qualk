import {combineReducers} from 'redux';
import authReducer from './auth/authReducer';
import menuElementClickReducer from './workbook/sidebarmenu/menuElementClickReducer';
import childMenuClickReducer from './workbook/sidebarmenu/childMenuClickReducer';
import filterClickReducer from './workbook/listview/filterClickReducer';
import workbookModalReducer from './workbook/workbook-detail/workbookModalReducer';
import toastMsgReducer from './public/toastMsgReducer';

const rootReducer = combineReducers({
    authReducer,
    menuElementClickReducer,
    childMenuClickReducer,
    filterClickReducer,
    workbookModalReducer,
    toastMsgReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
