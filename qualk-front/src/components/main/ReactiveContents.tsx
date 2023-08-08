import React, {useState} from 'react';
import styles from './ReactiveContents.module.css';
import {ReactComponent as DuckDefault} from 'assets/images/main/reactive-section/duck_default.svg';
import {ReactComponent as DuckQuiz} from 'assets/images/main/reactive-section/duck_quiz.svg';
import {ReactComponent as DuckMockTest} from 'assets/images/main/reactive-section/duck_mocktest.svg';
import {ReactComponent as DuckWorkbook} from 'assets/images/main/reactive-section/duck_workbook.svg';
import { useNavigate } from 'react-router-dom';

function ReactiveContents(){
    const navigate = useNavigate();
    const contents = [{
        id: 1,
        title: "시험문제 엿보기",
        description: `지피지기 백전백승! 어떤 문제가 시험에 출제되는 지 알아야지, 대비를 할 수 있겠죠?
        Qualk은 데이터와 관련된 다양한 자격증에 대한 문제들을 준비하고 있답니다!
        문제들을 살펴보면서 출제 경향과 지식을 쌓아나가봐요!`,
        logoClassName: styles.workbook,
        btnElementOption: {
            title: '시험문제 엿보러가기',
            onClickHandler: () => {
                navigate('/quiz/gaiq')
            }
        },
    },
    {
        id: 2,
        title: "퀴즈로 실력 쌓아나가기",
        description: `Qualk의 퀴즈 기능을 통해 매일 매일 작은 지식을 쌓아가보세요!
        10문제부터 30문제까지 원하는 개수의 문제를 선택해 풀어나가면서 실력도 점검하고, 공부도 할 수 있답니다!
        문제를 풀 때마다 바로바로 정답 여부와 해설을 볼 수 있어 빠르게 실력을 쌓아나갈 수 있어요`,
        logoClassName: styles.quiz,
        btnElementOption: {
            title: '퀴즈 풀러가기',
            onClickHandler: () => {
                navigate('/quiz/test/gaiq')
            }
        },
    },
    {
        id: 3,
        title: "실전과 비슷한 환경에서 모의고사로 최종 점검!",
        description: `실전에서 긴장하지 않도록 Qualk이 제공하는 모의고사 기능을 이용해보세요!
        자격증 별로 실제 시험과 동일한 시간과 문항 수로 구성되어 스스로의 실력을 가장 객관적으로 체크해볼 수 있어요!
        자격증 시험은 한번 뿐이지만, Qualk의 모의고사는 무제한으로 응시할 수 있으니 두려워 말고 도전해보세요!`,
        logoClassName: styles.mocktest,
        btnElementOption: {
            title: '모의고사 풀러가기',
            onClickHandler: () => {
                navigate('/quiz/test/gaiq')
            }
        },
    },]
    const [contentsData, setContentsData] = useState(contents);
    const [activeData, setActiveData] = useState(1); 

    return(
        <div className={styles.root_container}>
            <div className={styles.change_step_container}>
                <div className={styles.duck_container}>
                    {contentsData[0].id === activeData ? <DuckWorkbook /> : <DuckDefault />}
                    {contentsData[1].id === activeData ? <DuckQuiz /> : <DuckDefault />}
                    {contentsData[2].id === activeData ? <DuckMockTest /> : <DuckDefault />}
                </div>
                <div className={styles.info_box}>
                    <span>당신을 위한 Qualk 사용 방법 3단계</span>
                    <span>시험 문제 파악부터 모의고사까지 Qualk은 당신만을 위한 서비스를 제공합니다.</span>
                </div>
                <div className={styles.btn_container}>
                    <button onClick={() => {setActiveData(1)}} className={activeData === contentsData[0].id ? contentsData[0].logoClassName : ''}>시험 문제 엿보기</button>
                    <button onClick={() => {setActiveData(2)}} className={activeData === contentsData[1].id ? contentsData[1].logoClassName : ''}>퀴즈로 실력 쌓기</button>
                    <button onClick={() => {setActiveData(3)}} className={activeData === contentsData[2].id ? contentsData[2].logoClassName : ''}>모의고사 최종점검</button>
                </div>
            </div>
            <div className={`${styles.use_step_container} ${contentsData[activeData-1].logoClassName}`}>
                <div>
                    <div className={styles.step_box}>
                        <span>STEP 0{contentsData[activeData-1].id}</span>
                        <span>{contentsData[activeData-1].title}</span>
                        <span>{contentsData[activeData-1].description}</span>
                    </div>
                    <div className={styles.btn_container}>
                        <button 
                            onClick={contentsData[activeData-1].btnElementOption.onClickHandler}
                            className={`${styles.button_ele} ${contentsData[activeData-1].logoClassName}`}>{contentsData[activeData-1].btnElementOption.title}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReactiveContents;