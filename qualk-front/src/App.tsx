import React, {Suspense, useEffect} from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {CookiesProvider} from 'react-cookie';
import styled, { ThemeProvider } from 'styled-components';
import {Route, Routes} from 'react-router-dom';
import { dark, light } from 'theme/theme';
import { useTheme } from 'hook/useTheme';
import Main from 'routes/main/Main';
import WorkbookContainer from "routes/workbook/WorkbookContainer";
import NotFound from 'routes/notfound/NotFound';
import LoginPage from 'routes/login/LoginPage';
import CreateAccount from 'routes/createAccount/CreateAccount';
import helloWorld from 'javascripts/instrument';
// import ChangePasswordPage from 'routes/changePassword/ChangePasswordPage';
const ChangePasswordPage = React.lazy(() => import('routes/changePassword/ChangePasswordPage'));

const queryClient = new QueryClient();

function App() {
    const [toggleTheme, setToggleTheme] = useTheme(); // Theme Custom Hook
    const theme = toggleTheme === 'light' ? light : dark; // theme color 가져오기

    helloWorld(); //intro console
    
      return (
        <QueryClientProvider client={queryClient}>
            <CookiesProvider>
                <ThemeProvider theme={theme}>
                    <Routes>
                        <Route path='/' element={<Main />} />
                        <Route path='/quiz/*' element={<WorkbookContainer />} />
                        <Route path='/login' element={<LoginPage />} />
                        <Route path='/createAccount' element={<CreateAccount />} />
                        <Route path='/changepassword/:id' element={
                            <Suspense fallback={<h1>loading...</h1>}>
                                <ChangePasswordPage />
                            </Suspense>} 
                        />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </ThemeProvider>
            </CookiesProvider>
        </QueryClientProvider>
      );
}

export default App;
