export type TcreateQuizTest = {
    type: string,
    testNum: number,
    userId: string,
}

async function createQuizTest({type, testNum, userId}: TcreateQuizTest){
    let data = {
        "UserID": userId,
        "TestType": type.toUpperCase(),
        "QuestionNum": testNum
    }
    const ACCESSTOKEN = localStorage.getItem('accessToken');

    const response = await fetch(`/api/v1/test/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: ACCESSTOKEN ? ACCESSTOKEN : '',
        },
        body: JSON.stringify(data)
    })

    return response.json()
}

export default createQuizTest;
