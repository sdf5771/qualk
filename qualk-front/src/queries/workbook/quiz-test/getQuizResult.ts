import responseErrorHandler from "javascripts/responseErrorHandler";

type TgetQuizResultProps = {
    testId: string;
}

async function getQuizResult({testId}: TgetQuizResultProps){
    const ACCESSTOKEN = localStorage.getItem('accessToken');
    const response = await fetch(`/api/v1/test/result?test_id=${testId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: ACCESSTOKEN ? `Bearer ${ACCESSTOKEN}` : '',
        }
    })
    .then(async (res) => {
        if (!res.ok) {
            await responseErrorHandler(res);
            throw new Error()
        } else {
            return res;
        }
    });

    return response.json();
}

export default getQuizResult;