import React from 'react';
import styles from './AnswerAndExplainPresenter.module.css';

function AnswerAndExplainPresenter(){
    return(
        <div className={styles.answer_explain_root}>
            <div className={styles.title_container}>
                <span>정답 및 해설</span>
            </div>
            <div className={styles.content_container}>
                <div className={styles.answer_container}>
                    <span>데이터는 30일 이내에 복구될 수 있음</span>
                </div>
                <div className={styles.explain_container}>
                    <span>이 문제는 단순한 암기 문제입니다. 보기에 필터를 적용한 뒤 처리된 데이터는 복구할 수 없습니다. 그리고 필터가 설정되면 효과가 데이터에 적용되기 까지 최대 24시간이 걸립니다. 필터를 적용한 시점을 기준으로 전, 후의 데이터가 달라지므로 일반적으로 보기 생성시점에 필터 설정 작업을 진행합니다.</span>
                </div>
                <div className={styles.reference_container}>
                    <span>참고 : </span>
                    <span>https://support.google.com/analytics/answer/6086075</span>
                </div>
            </div>
        </div>
    )
}

export default AnswerAndExplainPresenter;
