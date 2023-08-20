import responseErrorHandler from "javascripts/responseErrorHandler";

export type TdeleteQuizDataProps = {
    testId: string;
}

async function deleteQuizData({testId}: TdeleteQuizDataProps){
    const ACCESSTOKEN = localStorage.getItem('accessToken');
    const response = await fetch(`/api/v1/test/?test_id=${testId}`, {
        method: 'DELETE',
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
    
    return response
}

export default deleteQuizData;