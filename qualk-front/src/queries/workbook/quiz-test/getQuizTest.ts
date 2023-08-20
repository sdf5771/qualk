import responseErrorHandler from "javascripts/responseErrorHandler";

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
            Authorization: ACCESSTOKEN ? `Bearer ${ACCESSTOKEN}` : '',
        },
    })
    .then(async (res) => {
        if (!res.ok) {
            await responseErrorHandler(res);
            throw new Error()
        } else {
            console.log('get res ', res);
            return res;
        }
    });

    return response.json();
}

export default getQuizTest;