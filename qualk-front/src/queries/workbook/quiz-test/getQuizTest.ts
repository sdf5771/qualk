type TgetQuizTestProps = {
    testId: string;
    testIndex: number;
}

async function getQuizTest({testId, testIndex}: TgetQuizTestProps){
    const ACCESSTOKEN = localStorage.getItem('accessToken');
    const response = await fetch(`/api/v1/test/?test_id=${testId}&test_index=${testIndex}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: ACCESSTOKEN ? ACCESSTOKEN : '',
        },
    })

    return response.json()
}

export default getQuizTest;