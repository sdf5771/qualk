import {useState} from 'react';

export const useTheme = () => {
    const LIGHT_MODE = 'light';
    const DARK_MODE = 'dark';
    // 브라우저 테마 정보
    const isBrowserLightMode = window.matchMedia && window.matchMedia('(prefers-color-schema: light)').matches;
    let initTheme = isBrowserLightMode ? LIGHT_MODE : DARK_MODE;

    // 사용자가 테마 설정을 직접 지정한 테마가 있는지 확인
    const localSettingTheme = localStorage.getItem('theme');

    // 지정한 테마가 존재한다면 해당 테마로 설정, 없으면 라이트 테마로 설정
    if(localSettingTheme){
       initTheme = localSettingTheme;
    } else {
        initTheme = LIGHT_MODE
    }

    const [theme, setTheme] = useState(initTheme);

    const setMode = (mode: string) => {
        // 테마정보 변경하면 localstorage 에 저장해 다음에도 지정한 값으로 테마가 보이도록 설정
        window.localStorage.setItem('theme', mode);
        setTheme(mode);
    }

    const toggleTheme = () => setMode(theme === 'light' ? 'dark' : 'light');

    return [theme, toggleTheme];
}
