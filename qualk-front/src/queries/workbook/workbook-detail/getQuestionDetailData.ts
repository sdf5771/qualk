import {NavigateFunction} from "react-router-dom";

const LocalServer_URL = process.env.LocalServerURL;
const RealServer_URL = process.env.RealServerURL;

async function getQuestionDetailData(question_id:number, question_type:string, navigate: NavigateFunction){
    // `/question/problem/${question_id}/${question_type}`
    const response = await fetch(`api/v1/quiz/${question_type}/${question_id}`,{
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
