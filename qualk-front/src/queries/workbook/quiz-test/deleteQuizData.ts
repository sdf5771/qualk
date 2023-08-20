export type TdeleteQuizDataProps = {
    testId: string;
}

async function deleteQuizData({testId}: TdeleteQuizDataProps){
    const ACCESSTOKEN = localStorage.getItem('accessToken');
    const response = await fetch(`/api/v1/test/?test_id=${testId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: ACCESSTOKEN ? ACCESSTOKEN : '',
        }
    });
    
    return response
}

export default deleteQuizData;