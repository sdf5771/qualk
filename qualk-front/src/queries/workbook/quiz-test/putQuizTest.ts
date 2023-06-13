type TputQuizTest = {
    testId: string,
    testIndex: number,
    userCorrect: number,
    interval: number
}

async function putQuizTest({testId, testIndex, userCorrect, interval}: TputQuizTest){
    const response = await fetch(`/api/v1/quiz/test/?testid=${testId}&testindex=${testIndex}&usercorrect=${userCorrect}&interval=${interval}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response.json()
}

export default putQuizTest;
