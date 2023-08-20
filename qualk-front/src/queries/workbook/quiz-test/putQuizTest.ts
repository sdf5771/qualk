import responseErrorHandler from "javascripts/responseErrorHandler";

type TputQuizTest = {
    testId: string,
    testIndex: number,
    userCorrect: number,
    interval: number
}

async function putQuizTest({testId, testIndex, userCorrect, interval}: TputQuizTest){
    const ACCESSTOKEN = localStorage.getItem('accessToken');
    const response = await fetch(`/api/v1/test/?test_id=${testId}&test_index=${testIndex}&user_input=${userCorrect}&interval=${interval}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: ACCESSTOKEN ? `Bearer ${ACCESSTOKEN}` : '',
        },
    })
    .then(async (res) => {
        if (!res.ok) {
            await responseErrorHandler(res);
            throw new Error()
        } else {
            return res;
        }
    });

    return response.json()
}

export default putQuizTest;
