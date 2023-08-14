import  React, {useEffect} from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import styled, { ThemeProvider } from 'styled-components';
import {Route, Routes} from 'react-router-dom';
import { dark, light } from 'theme/theme';
import { useTheme } from 'hook/useTheme';
import Main from 'routes/main/Main';
import WorkbookContainer from "routes/workbook/WorkbookContainer";
import NotFound from 'routes/notfound/NotFound';
import LoginPage from 'routes/login/LoginPage';
import CreateAccount from 'routes/createAccount/CreateAccount';

const queryClient = new QueryClient();

function App() {
    const [toggleTheme, setToggleTheme] = useTheme(); // Theme Custom Hook
    const theme = toggleTheme === 'light' ? light : dark; // theme color 가져오기
      return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/quiz/*' element={<WorkbookContainer />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/createaccount' element={<CreateAccount />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </ThemeProvider>
        </QueryClientProvider>
      );
}

export default App;
