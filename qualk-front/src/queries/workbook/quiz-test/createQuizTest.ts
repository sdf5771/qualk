import responseErrorHandler from "javascripts/responseErrorHandler";

export type TcreateQuizTest = {
    type: string,
    testNum: number,
}

async function createQuizTest({type, testNum}: TcreateQuizTest){
    let data = {
        "TestType": type.toUpperCase(),
        "QuestionNum": testNum
    }
    const ACCESSTOKEN = localStorage.getItem('accessToken');

    const response = await fetch(`/api/v1/test/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: ACCESSTOKEN ? `Bearer ${ACCESSTOKEN}` : '',
        },
        body: JSON.stringify(data)
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

export default createQuizTest;
