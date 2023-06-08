import React, {useEffect, useState} from 'react';
import styles from 'stylesheets/workbook/quiz-test/QuizTestMain.module.css';
import publicAnimations from 'stylesheets/public/animation.module.css';
import {ReactComponent as GaiqLogo} from 'assets/images/workbook/listview/gaiq_logo.svg';
import QuizSelectElement from 'components/workbook/quiz-test/QuizSelectElement';
import MockExamSelectElement from 'components/workbook/quiz-test/MockExamSelectElement';
import {RootState} from "reducers/reducers";
import {useSelector} from "react-redux";
import NoContents from "components/public/no-contents/NoContents";

function QuizTestMain(){
    const menuElementActivateSelector = useSelector((state:RootState) => state.childMenuClickReducer);
    const [category, setCategory] = useState(menuElementActivateSelector);

    useEffect(() => {
        setCategory(menuElementActivateSelector);
    }, [menuElementActivateSelector['activeMenu']])

    if(category['activeMenu'] === "GAIQ"){
        return (
            <div className={`${styles.quiz_test_root} ${publicAnimations.fade_in}`}>
                <div className={styles.quiz_test_header}>
                    <div className={styles.quiz_test_title_container}>
                        <GaiqLogo width="50px" height="50px"/>
                        <span>{category['activeMenu']}</span>
                    </div>
    
                    <div className={styles.test_list_container}>
                        <div className={styles.test_list_header}>
                            <span>테스트를 대비하세요!</span>
                        </div>
                        <div className={styles.test_list_body}>
                            <QuizSelectElement 
                                testLength={10} 
                                time={10} 
                                title="인생은 실전!" 
                                description='GAIQ 테스트와 비슷한 환경에서
                                 테스트를 대비해보세요!'
                                option={{backgroundColor: "#fffaed", fontColor: "#ffba00"}}
                                />
                            <QuizSelectElement 
                                testLength={20} 
                                time={10} 
                                title="이제 할만 하죠?" 
                                description='GAIQ 테스트와 비슷한 환경에서
                                 테스트를 대비해보세요!'
                                option={{backgroundColor: "#fdfaf2", fontColor: "#ff9300"}}
                                />
                            <QuizSelectElement 
                                testLength={30} 
                                time={10} 
                                title="테스트 폼 미쳤다!" 
                                description='GAIQ 테스트와 비슷한 환경에서
                                 테스트를 대비해보세요!'
                                option={{backgroundColor: "#fdfaf2", fontColor: "#ff6c00"}}
                                />
                        </div>
                    </div>
    
                    <div className={styles.mockexam_container}>
                        <div className={styles.mockexam_header}>
                            <span>실전과 비슷한 환경의 모의고사에요.</span>
                        </div>
                        <div className={styles.mockexam_body}>
                            <MockExamSelectElement 
                                testLength={50} 
                                time={75} 
                                title="연습은 그만! 이제 실전으로" 
                                description='GAIQ 테스트와 비슷한 환경에서 테스트를 대비해보세요!'/>
                        </div>
                    </div>
    
                </div>
            </div>
        )
    } else {
        return (
            <div className={`${styles.quiz_test_root} ${publicAnimations.fade_in}`}>
                <div className={styles.quiz_test_header}>
                    <div className={styles.quiz_test_title_container}>
                        <GaiqLogo width="50px" height="50px"/>
                        <span>{category ? category['activeMenu'] : 'Loading'}</span>
                    </div>
                    <div className={styles.no_contents_container}>
                        <NoContents />
                    </div>
                </div>
            </div>
        );
    }
}

export default QuizTestMain;