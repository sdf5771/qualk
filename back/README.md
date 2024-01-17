# qualk

## qualk 설치된 패키지 보는 방법


## qualk 패키지 설치 방법
```
poetry export -f requirements.txt > requirements.txt
```

## qualk 패키지 추가 하는 방법
예시)
```
poetry add python-multipart
```

## qualk 빌드 방법
```
poetry run uvicorn main:app
```

## API : api/v1/quiz/list

Method : GET
Parameter | description | 예시
---|---| ---|
_type | 문제 유형 |  GAIQ, SQLD
page | 페이지 번호 | 1, 2, 3, 4, 5, 6
page_size | 페이지를 나누는 단위 | 3, 6
list_type | 조회를 어떻게 할지 | top3, old, new
search | 검색어 | which
search_type | 검색어 type | keyword, tag 로 검색할지

## response : api/v1/quiz/list

```
request : curl -X 'GET' \
  'http://localhost:8000/api/v1/quiz/list?_type=GAIQ&page=1&page_size=6&serach=which&search_type=keyword' \
  -H 'accept: application/json'

response:
{
  "quizList": [
    {
      "contentId": 1,
      "title": "Which of the following tools could you use in order to collect and send data from a mobile app to a Google Analytics 4 property?",
      "type": "GAIQ",
      "view": 367,
      "create": "2023-03-13",
      "tag": [
        "SDK"
      ]
    },
    {
      "contentId": 3,
      "title": "You collect data or your point-of-sale system that could complement the data you are sending to Google Analytics from your website and app.\nWhich of these features allows you to collect and send events directly to Google Analytics servers?",
      "type": "GAIQ",
      "view": 5,
      "create": "2023-03-13",
      "tag": [
        "Measurement Protocol"
      ]
    },
    {
      "contentId": 5,
      "title": "You've just set up an option on your website for your users to sign up for a newsletter. You want to count those new sign-up events as conversions and create an audience for users who signed up.\nWhich part of your Google Analytics 4 property lets you manage events, conversions, and audiences?",
      "type": "GAIQ",
      "view": 0,
      "create": "2023-03-13",
      "tag": [
        "Configure"
      ]
    },
    {
      "contentId": 8,
      "title": "Which of these structures represents a Google Analytics account's hierarchy?",
      "type": "GAIQ",
      "view": 0,
      "create": "2023-03-13",
      "tag": [
        "Account",
        " Property",
        "Data stream"
      ]
    },
    {
      "contentId": 9,
      "title": "Which section would you open in your Google Analytics property in order to find advanced techniques that can help you uncover deeper insights about your customers’ engagement?",
      "type": "GAIQ",
      "view": 0,
      "create": "2023-03-13",
      "tag": []
    },
    {
      "contentId": 11,
      "title": "You manage a gardening company and you post a new how-to video on your website for your customers. In Google Analytics you find lots of data about the user interactions with this video.\nWhile looking through your data, which of these is a “user property\" collected by Google Analytics?",
      "type": "GAIQ",
      "view": 0,
      "create": "2023-03-13",
      "tag": []
    }
  ],
  "total": 9,
  "page": 1
}
```


## Test API
HTTP Method | URI | description | 
---|---|---|
POST | /api/v1/test | test 생성
GET | /api/v1/test | testId 와 testIndex를 입력해서 문제 정보를 가져옴
PUT | /api/v1/test | 사용자가 입력한 정답을 서버로 보내는 것
POST | /api/v1/test | test 생성
DELETE | /api/v1/test | test 삭제

## API response
POST : /api/v1/test
상황 1 userId 로 가진 test가 RUNNING 상태가 없을 경우
```
Input : Post
{
  "UserID": "kzsc5464",
  "TestType": "GAIQ",
  "QuestionNum": 10
}
Output 
{
  "testId": "671044f8-be2c-49a1-9625-64e5f7aba09f"
  "testIndex": 1
}
```
상황 2 userId 로 가진 test가 RUNNING 상태가 있을 경우
```
{
  "testId": "118f3459-4235-4faa-9fc0-0a6e30ab3bf7",
  "testIndex": 2
}
```
GET : /api/v1/test
```
Input : Get
{
  test_id='91b0f39f-13cc-44eb-a2f5-d48d7ae9ccc1',
  test_index=1
}
Output
{
  "testId": "91b0f39f-13cc-44eb-a2f5-d48d7ae9ccc1",
  "title": "If you managed a blog that featured multiple different writers, what could you use to report the relevant writer's name on each article page?\n\n",
  "contentList": [
    "Custom metric",
    "Custom user parameter",
    "Custom table",
    "Custom dimension"
  ]
}
```
PUT : /api/v1/test 
```
Input : Get
{
  "test_id": "91b0f39f-13cc-44eb-a2f5-d48d7ae9ccc1", -> Str
  "test_index":1
  "user_input":1
  "interval":12
}
Output
{
  "testId": "91b0f39f-13cc-44eb-a2f5-d48d7ae9ccc1",
  "correct": 1,
  "description": null,
  "referenceUrl": null
}
```

GET : /api/v1/test/result
```
Input : Get
{
  "testId": "91b0f39f-13cc-44eb-a2f5-d48d7ae9ccc1"
}
Output
{
  "testId": "91b0f39f-13cc-44eb-a2f5-d48d7ae9ccc1",
  "correct": 43,
  "canonialName": "GAIQ 인증 모의시험",
  "questionNum": 50,
  "passNum": 40,
  "passPercent": 86,
  "wrongQuestion": [
    {
      "ContentID": 1,
      "Correct": 0,
      "Title": "Which of the following tools could you use in order to collect and send data from a mobile app to a Google Analytics 4 property?",
      "Type": "GAIQ",
      "ReferenceURL": null,
      "ContentList": "Google Marketing Platform, Firebase SDK,Website tag,Google Ads",
      "Description": "To collect and send data from a mobile app to a Google Analytics 4 property, you could use the Google Analytics SDK for Android or iOS. The SDK provides various APIs and methods that you can use to send data to Google Analytics.\n\nHere are the steps to get started:\n\nSet up a Google Analytics 4 property in your Google Analytics account and obtain the measurement ID.\n\nDownload and integrate the Google Analytics SDK for Android or iOS into your mobile app.\n\nUse the SDK APIs and methods to track user interactions, events, and other data in your app.\n\nSet the measurement ID in the SDK configuration to ensure that the data is sent to the correct property.\n\nTest your implementation and verify that the data is being collected and sent to Google Analytics.\n\nNote that you may also need to configure additional settings, such as user properties and custom dimensions, to capture the data that is relevant to your app and business goals."
    },
    {
      "ContentID": 2,
      "Correct": 1,
      "Title": "You would like to export your Google Analytics data to BigQuery to run queries and ombine some of your offline data with Analytics data. What type of Analytics property can export data to BigQuery?",
      "Type": "GAIQ",
      "ReferenceURL": null,
      "ContentList": "Only Analytics 360 properties in GA4 or Universal Analytics,Standard or Analytics 360 properties using GA4,Standard or Analytics 360 properties using Universal Analytics,Only Standard properties in GA4 or Universal Analytics",
      "Description": "In the previous UA version, Analytics 360 properties were required to export GA data to BigQuery. However, in GA4 version, both Standard and Analytics 360 properties can be exported to BigQuery."
    },
    {
      "ContentID": 3,
      "Correct": 1,
      "Title": "You collect data or your point-of-sale system that could complement the data you are sending to Google Analytics from your website and app.\nWhich of these features allows you to collect and send events directly to Google Analytics servers?",
      "Type": "GAIQ",
      "ReferenceURL": null,
      "ContentList": "Modify event,Measurement Protocol,HTTP request,Data import",
      "Description": "The feature that allows you to collect and send events directly to Google Analytics servers is called the Measurement Protocol. This protocol enables you to send raw user interaction data, such as clicks or transactions, directly to Google Analytics from any internet-connected device or system, including point-of-sale systems. By using the Measurement Protocol, you can augment the data you collect from your website and app with additional data from other sources, helping you gain deeper insights into user behavior and improve your business decisions."
    },
    {
      "ContentID": 4,
      "Correct": 0,
      "Title": "You have many events on your website that are very valuable, like when users purchase items or sign up for your newsletter. You would like to mark these events as important and assign a value to these events when they happen.\n\nWhat should you mark these events as in your Google Analytics 4 property?",
      "Type": "GAIQ",
      "ReferenceURL": null,
      "ContentList": "Conversion events,Custom events,Goals,Recommended events",
      "Description": "In your Google Analytics 4 property, you should mark these valuable events as \"Conversions\". Conversions are actions that you want users to take on your website or app, such as making a purchase, filling out a form, or signing up for a newsletter. By marking these events as Conversions, you can easily track them in Google Analytics and see how many users are completing them. Additionally, you can assign a value to each Conversion event to track how much revenue or other important metric is generated by each event. This can help you measure the effectiveness of your marketing efforts and make data-driven decisions to improve your website or app."
    }
  ]
}
```

2023-06-07 github slack 연동