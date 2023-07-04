
type TgetQuizResultProps = {
    testId: string;
}

async function getQuizResult({testId}: TgetQuizResultProps){
    const response = await fetch(`/api/v1/test/result?test_id=${testId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response.json();
}

export default getQuizResult;