
type TgetQuizResultProps = {
    testId: string;
}

async function getQuizResult({testId}: TgetQuizResultProps){
    const ACCESSTOKEN = localStorage.getItem('accessToken');
    const response = await fetch(`/api/v1/test/result?test_id=${testId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: ACCESSTOKEN ? ACCESSTOKEN : '',
        }
    });

    return response.json();
}

export default getQuizResult;