type TcreateQuizTest = {
    type: string,
    testName: string,
    userId: string,
}

async function createQuizTest({type, testName, userId}: TcreateQuizTest){
    console.log(`/api/v1/quiz/test/?type=${type}&testName=${testName}&user_id=${userId}`)
    const response = await fetch(`/api/v1/quiz/test/?type=${type}&testName=${testName}&user_id=${userId}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response.json()
}

export default createQuizTest;
