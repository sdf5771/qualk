import React,{useState, useEffect} from 'react';
import styles from 'stylesheets/workbook/quiz-test/QuizTestMain.module.css';
import publicAnimations from 'stylesheets/public/animation.module.css';
import {ReactComponent as GaiqLogo} from 'assets/images/workbook/listview/gaiq_logo.svg';
import NoContents from "components/public/no-contents/NoContents";
import { useLocation } from 'react-router-dom';

function QuizTestNoContents(){
    const location = useLocation();
    const [menuName, setMenuName] = useState('');

    useEffect(() => {
        setMenuName(location.pathname.split('/')[3].toUpperCase());
    } ,[location])

    return (
        <div className={`${styles.quiz_test_root} ${publicAnimations.fade_in}`}>
            <div className={styles.quiz_test_header}>
                <div className={styles.quiz_test_title_container}>
                    <GaiqLogo width="50px" height="50px"/>
                    <span>{menuName !== '' ? menuName : 'Loading'}</span>
                </div>
                <div className={styles.no_contents_container}>
                    <NoContents />
                </div>
            </div>
        </div>
    );
}

export default QuizTestNoContents;