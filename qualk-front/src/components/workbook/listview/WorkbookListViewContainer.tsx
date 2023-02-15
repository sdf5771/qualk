import React, {useState, useEffect} from 'react';
import WorkbookListViewPresenter from "./WorkbookListViewPresenter";
import {useSelector} from "react-redux";
import {RootState} from "reducers/reducers";

const dummyData = [
    {
        "qualification": 'GAIQ',
        "question_number": 1,
        "question": '필터가 적용된 후 필터링 된 데이터를 복구할 수 있는 옵션은?',
        "options": {
            "1": {
                title: '데이터는 5일 이내에 복구될 수 있음',
                is_correct: false,
            },
            "2": {
                title: '데이터는 10일 이내에 복구될 수 있음',
                is_correct: false,
            },
            "3": {
                title: '데이터는 30일 이내에 복구될 수 있음',
                is_correct: false,
            },
            "4": {
                title: '필터링된 데이터는 복구할 수 없음',
                is_correct: true,
            }
        },
        "explanation": '보기에 필터를 적용한 뒤 처리한 데이터는 복구할 수 없습니다.\n' +
            '필터가 적용한 시점을 기준으로 전/후의 데이터가 달라지므로 일반적으로 보기 생성시점에 필터 설정 작업을 진행합니다.\n' +
            '(필터 설정 시, 효과가 데이터에 적용되기까지 최대 24시간 소요)',
        "has_reference": true,
        "reference": [
            {
                "title": "구글 도움말",
                "author": "Google",
                "link": "https://support.google.com/analytics/answer/6086075"
            }
        ],
        "keywords": ["GAIQ", "Google Analytics", "필터링", "필터"],
        "created": new Date(),
        "edited": new Date(),
        "views": 213,
    },
    {
        "qualification": 'GAIQ',
        "question_number": 2,
        "question": '자동 태그 추가를 통해 데이터를 수집하는 트래픽 종류는?',
        "options": {
            "1": {
                title: '웹사이트 추천 트래픽',
                is_correct: false,
            },
            "2": {
                title: '소셜 미디어 트래픽',
                is_correct: false,
            },
            "3": {
                title: 'Google Ads 캠페인 트래픽',
                is_correct: true,
            },
            "4": {
                title: 'Google 이외의 검색 엔진 트래픽',
                is_correct: false,
            }
        },
        "explanation": 'Google Ads에서는 Google Ads 전환 추적 및 광고 클릭에 대한 성과 측정을 위한 목적으로 자동 태그를 설정할 수 있습니다.\n' +
            '사용자가 광고를 클릭하면 자동 태그 추가 기능에서 추가 정보(\'Google 클릭 식별자의\'의 약어인 GCLID라는 매개변수)를 사용자가 클릭하여 연결된 URL에 추가합니다.\n' +
            '자동 태그 추가 기능은 다음을 수행하기 전에 설정해야 하는 기능입니다.\n' +
            '- 모든 브라우저에서 웹사이트에서 발생한 전환 추적\n' +
            '- Google 애널리틱스를 비롯한 기타 외부 소스 (예: 고객 관계 관리(CRM) 시스템)의 전환 데이터를 Google Ads로 가져오기\n' +
            '- Google Ads 캠페인 및 비용 데이터를 Google 애널리틱스 보고서로 가져오기\n' +
            '- 이탈률, 평균 세션 시간 등의 Google 애널리틱스 사이트 참여 측정항목을 Google Ads 보고서로 가져오기\n'
        ,
        "has_reference": true,
        "reference": [
            {
                "title": "구글 도움말",
                "author": "Google",
                "link": "https://support.google.com/analytics/answer/6086075"
            }
        ],
        "keywords": ["GAIQ", "Google Analytics", "소셜 미디어", "Google Ads 캠페인", "검색 엔진 트래픽"],
        "created": new Date(),
        "edited": new Date(),
        "views": 213,
    },
]

function WorkbookListViewContainer(){
    const menuElementActivateSelector = useSelector((state:RootState) => state.menuElementClickReducer);
    const [category, setCategory] = useState(menuElementActivateSelector);
    useEffect(() => {
        setCategory(menuElementActivateSelector);
    }, [menuElementActivateSelector['activeMenuId']])

    return (
        <WorkbookListViewPresenter categoryData={category} workbookData={dummyData} />
    );
}

export default WorkbookListViewContainer;
