import React, {useState, useRef} from 'react';
import {
    NavLink,
  } from 'react-router-dom';
import styles from './SNB.module.css';
import publicAnimations from 'stylesheets/public/animation.module.css';
import {ReactComponent as DataAnalysisLogo} from 'assets/images/workbook/listview/sidebarmenu/dataanalysis_logo.svg';
import {ReactComponent as TestLogo} from 'assets/images/workbook/listview/sidebarmenu/quiz_test_logo.svg';
import {ReactComponent as ArrowSvgComponent} from 'assets/images/workbook/listview/sidebarmenu/arrow_top.svg';
import { ReponsivePC, ReponsiveMobile, ReponsiveTabletPC } from 'components/public/responsive-wrapper/ResponsiveWrapper';

function SNB(){
    const dataAnalysisRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    const testRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    const [activeTitle, setActiveTitle] = useState<number | null>(null);

    const activeStyle = {
        color: '#ff9300'
    }

    return (
        <>
        <ReponsivePC>
            <div className={styles.snb_root}>
                <div ref={dataAnalysisRef} className={activeTitle === 0 ? styles.activeMenu : ''}>
                    <div className={styles.navbar_title} onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                        setActiveTitle(0);
                    }}>
                        <DataAnalysisLogo className={styles.logo}/>
                        <span>Data Analysis</span>
                        <ArrowSvgComponent className={`${styles.arrow_svg} ${activeTitle === 0 ? styles.activeMenu : ''}`}/>
                    </div>
                    <ul className={`${styles.reset_ul} ${publicAnimations.fade_in}`}>
                        <li>
                            <NavLink className={styles.navlink} style={({isActive}) => isActive ? activeStyle : {}} to='/quiz/gaiq'>GAIQ</NavLink>
                        </li>
                        <li>
                            <NavLink className={styles.navlink} style={({isActive}) => isActive ? activeStyle : {}} to='/quiz/sqid'>SQID</NavLink>
                        </li>
                        <li>
                            <NavLink className={styles.navlink} style={({isActive}) => isActive ? activeStyle : {}} to='/quiz/sqld'>SQLD</NavLink>
                        </li>
                    </ul>
                </div>
                
                <div ref={testRef} className={activeTitle === 1 ? styles.activeMenu : ''}>
                    <div className={styles.navbar_title} onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                        setActiveTitle(1);
                    }}>
                        <TestLogo className={styles.logo} />
                        <span>Test</span>
                        <ArrowSvgComponent className={`${styles.arrow_svg} ${activeTitle === 1 ? styles.activeMenu : ''}`}/>
                    </div>
                    <ul className={`${styles.reset_ul} ${publicAnimations.fade_in}`}>
                        <li>
                            <NavLink className={styles.navlink} style={({isActive}) => isActive ? activeStyle : {}} to='/quiz/test/gaiq'>GAIQ</NavLink>
                        </li>
                        <li>
                            <NavLink className={styles.navlink} style={({isActive}) => isActive ? activeStyle : {}} to='/quiz/test/sqid'>SQID</NavLink>
                        </li>
                        <li>
                            <NavLink className={styles.navlink} style={({isActive}) => isActive ? activeStyle : {}} to='/quiz/test/sqld'>SQLD</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </ReponsivePC>
        <ReponsiveTabletPC>
            <div className={styles.snb_root}>
                <div ref={dataAnalysisRef} className={activeTitle === 0 ? styles.activeMenu : ''}>
                    <div className={styles.navbar_title} onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                        console.log(activeTitle)
                        if(activeTitle === 0){
                            setActiveTitle(null)
                        } else {
                            setActiveTitle(0)
                        }
                    }}>
                        <DataAnalysisLogo className={styles.logo}/>
                        <div>
                            <span>Data Analysis</span>
                            <span></span>
                        </div>
                        <ArrowSvgComponent className={`${styles.arrow_svg} ${activeTitle === 0 ? styles.activeMenu : ''}`}/>
                    </div>
                    <ul className={`${styles.reset_ul} ${publicAnimations.fade_in}`}>
                        <li>
                            <NavLink className={styles.navlink} style={({isActive}) => isActive ? activeStyle : {}} to='/quiz/gaiq'>GAIQ</NavLink>
                        </li>
                        <li>
                            <NavLink className={styles.navlink} style={({isActive}) => isActive ? activeStyle : {}} to='/quiz/sqid'>SQID</NavLink>
                        </li>
                        <li>
                            <NavLink className={styles.navlink} style={({isActive}) => isActive ? activeStyle : {}} to='/quiz/sqld'>SQLD</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </ReponsiveTabletPC>
        <ReponsiveMobile>
            <div className={styles.snb_root}>
                <div ref={dataAnalysisRef} className={activeTitle === 0 ? styles.activeMenu : ''}>
                    <div className={styles.navbar_title} onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                        console.log(activeTitle)
                        if(activeTitle === 0){
                            setActiveTitle(null)
                        } else {
                            setActiveTitle(0)
                        }
                    }}>
                        <DataAnalysisLogo className={styles.logo}/>
                        <div>
                            <span>Data Analysis</span>
                            <span></span>
                        </div>
                        <ArrowSvgComponent className={`${styles.arrow_svg} ${activeTitle === 0 ? styles.activeMenu : ''}`}/>
                    </div>
                    <ul className={`${styles.reset_ul} ${publicAnimations.fade_in}`}>
                        <li>
                            <NavLink className={styles.navlink} style={({isActive}) => isActive ? activeStyle : {}} to='/quiz/gaiq'>GAIQ</NavLink>
                        </li>
                        <li>
                            <NavLink className={styles.navlink} style={({isActive}) => isActive ? activeStyle : {}} to='/quiz/sqid'>SQID</NavLink>
                        </li>
                        <li>
                            <NavLink className={styles.navlink} style={({isActive}) => isActive ? activeStyle : {}} to='/quiz/sqld'>SQLD</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </ReponsiveMobile>
        </>
    )
}

export default SNB;