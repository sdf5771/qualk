type TcreateQuizTest = {
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

    console.log('data ', data);

    const response = await fetch(`/api/v1/test/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    return response.json()
}

export default createQuizTest;
