import {NavigateFunction} from "react-router-dom";

async function getQuestionDetailData(question_id:number, question_type:string, navigate: NavigateFunction){
    const response = await fetch(`http://localhost:8000/api/v1/quiz/${question_type}/${question_id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).catch((err) => err)

    if(!response.ok){
        navigate('/quiz');
    }

    return response.json()
}

export default getQuestionDetailData;
