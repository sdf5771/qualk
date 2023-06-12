import React from 'react';

type TgetQuizTestProps = {
    testId: string;
    testIndex: number;
}

async function getQuizTest({testId, testIndex}: TgetQuizTestProps){
    const response = await fetch(`/api/v1/quiz/test/?testid=${testId}&testindex=${testIndex}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response.json()
}

export default getQuizTest;