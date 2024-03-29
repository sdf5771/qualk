import {combineReducers} from 'redux';
import authReducer from './auth/authReducer';
import menuElementClickReducer from './workbook/sidebarmenu/menuElementClickReducer';
import childMenuClickReducer from './workbook/sidebarmenu/childMenuClickReducer';
import filterClickReducer from './workbook/listview/filterClickReducer';
import workbookModalReducer from './workbook/workbook-detail/workbookModalReducer';
import toastMsgReducer from './public/toastMsgReducer';
import mockTestTimerReducer from './workbook/quiz-test/mockTestTimerReducer';
import transferWorkbookData from './workbook/workbook-detail/transferWorkbookData';
import termModalReducer from './createAccount/termModalReducer';
import termListAgreedReducer from './createAccount/termListAgreedReducer';
import termListDataReducer from './createAccount/termListDataReducer';
import findPasswordModalReducer from './login/findPasswordModalReducer';
import sendMailModalReducer from './createAccount/sendMailModalReducer';
import userInfoReducer from './login/userInfoReducer';

const rootReducer = combineReducers({
    authReducer,
    menuElementClickReducer,
    childMenuClickReducer,
    filterClickReducer,
    workbookModalReducer,
    toastMsgReducer,
    mockTestTimerReducer,
    transferWorkbookData,
    termModalReducer,
    termListAgreedReducer,
    termListDataReducer,
    findPasswordModalReducer,
    sendMailModalReducer,
    userInfoReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
