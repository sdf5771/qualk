# qualk


## qualk 패키지 설치 방법
```
poetry export -f requirements.txt > requirements.txt
```

## qualk 빌드 방법
```
poetry run uvicorn main:app
```

## API
HTTP Method | URI | description |
---|---|---|
GET | api/v1/quiz/{type}/{quiz_id} | 선택 퀴즈 가져오기
GET | api/v1/quiz/{type}/top_3 | view 상위 3가지 가져오기 
GET | api/v1/quiz/{type}/view/{last_index} | 조회수 순으로 가져오기
GET | api/v1/quiz/{type}/new/{last_index} | 최신순 으로 가져오기 
GET | api/v1/quiz/{type}/old/{last_index} | 오래된 순으로 가져오기