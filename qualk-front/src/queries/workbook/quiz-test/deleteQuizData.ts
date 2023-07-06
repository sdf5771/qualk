export type TdeleteQuizDataProps = {
    testId: string;
}

async function deleteQuizData({testId}: TdeleteQuizDataProps){
    const response = await fetch(`/api/v1/test/?test_id=${testId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // return response.json();
}

export default deleteQuizData;