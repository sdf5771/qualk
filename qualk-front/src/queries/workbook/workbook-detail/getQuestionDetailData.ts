const BASE_URL = process.env.LocalServerURL;

async function getQuestionDetailData(question_id:number, question_type:string){
    const response = await fetch(`/question/problem/${question_id}/${question_type}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return response.json()
}

export default getQuestionDetailData;
