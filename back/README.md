# qualk


## qualk 패키지 설치 방법
```
poetry export -f requirements.txt > requirements.txt
```

## qualk 빌드 방법
```
poetry run uvicorn main:app
```

## 순수 문제 API
HTTP Method | URI | description |
---|---|---|
GET | api/v1/quiz/{type}/{quiz_id} | 선택 퀴즈 가져오기
GET | api/v1/quiz/{type}/top_3 | view 상위 3가지 가져오기 
GET | api/v1/quiz/{type}/view/{last_index} | 조회수 순으로 가져오기
GET | api/v1/quiz/{type}/new/{last_index} | 최신순 으로 가져오기 
GET | api/v1/quiz/{type}/old/{last_index} | 오래된 순으로 가져오기

## 퀴즈 API
HTTP Method | URI | description | 
---|---|---|
POST | /api/v1/quiz/test | test 처음에 들어갈 때 만드는 것
GET | /api/v1/quiz/test | testId 와 testIndex를 입력해서 문제 정보를 가져옴
PUT | /api/v1/quiz/test | 사용자가 입력한 정답을 서버로 보내는 것
POST | /api/v1/quiz/test | test 처음에 들어갈 때 만드는 것


## API response
POST : /api/v1/quiz/test
상황 1 userId 로 가진 test가 RUNNING 상태가 없을 경우
```
{
  "testId": "671044f8-be2c-49a1-9625-64e5f7aba09f"
}
```
상황 2 userId 로 가진 test가 RUNNING 상태가 있을 경우
```
{
  "testId": "118f3459-4235-4faa-9fc0-0a6e30ab3bf7",
  "testindex": 2
}
```
GET : /api/v1/quiz/test
```
{
  "testId": "118f3459-4235-4faa-9fc0-0a6e30ab3bf7",
  "title": "You are in your Google Analytics property's Explore section. What exploration technique should you use in order to customize metrics and dimensions in table format?",
  "contentList": [
    " Funnel exploration",
    "Free form",
    "Segment overlap",
    "Cohort explorations"
  ]
}
```
PUT : /api/v1/quiz/test 
```
{
  "testId": "118f3459-4235-4faa-9fc0-0a6e30ab3bf7"
}
```

GET : /api/v1/quiz/result
```
{
  "testId": "118f3459-4235-4faa-9fc0-0a6e30ab3bf7",
  "correct": 49,
  "question_number": 50,
  "wrong_question": [
    {
      "count": 50,
      "testId": "118f3459-4235-4faa-9fc0-0a6e30ab3bf7",
      "title": "You are in your Google Analytics property's Explore section. What exploration technique should you use in order to customize metrics and dimensions in table format?",
      "content_list": " Funnel exploration,Free form,Segment overlap,Cohort explorations",
      "usercorrect": 3,
      "interval": 5,
      "correct": 2
    }
  ]
}
```