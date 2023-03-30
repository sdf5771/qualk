import React, {useEffect, useState} from 'react';
import styles from 'stylesheets/main/Main.module.css';
import {useNavigate} from 'react-router-dom';
import {ReactComponent as MainBackGroundImage} from 'assets/images/main/main_background-image.svg';
import {ReactComponent as MainLogo} from 'assets/images/main/main_logo.svg';

function Main(){
    const navigate = useNavigate();
    const [viewBox, setViewBox] = useState('0 0 1920 970');

    // useEffect(() => {
    //     const handleResize = () => {
    //         const {width, height} = window.screen;
    //         setViewBox(`0 0 ${width} ${height}`);
    //     }
    //
    //     window.addEventListener('resize', handleResize);
    //
    //     return () => window.removeEventListener('resize', handleResize);
    // }, [])

    const btnOnClickHandler = (event: React.MouseEvent) => {
        navigate('/workbook');
    }
    return(
        <div className={styles.main_root}>
            <div className={styles.background_container}>
                <MainBackGroundImage width="100%" height="100%" viewBox={viewBox} />
            </div>
            <div className={styles.logo_container}>
                <MainLogo />
            </div>
            <div className={styles.btn_container}>
                <button onClick={btnOnClickHandler} className={styles.content_btn}>콘텐츠 바로가기</button>
            </div>
        </div>
    )
}

export default Main
