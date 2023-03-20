import {NavigateFunction} from "react-router-dom";

const LocalServer_URL = process.env.LocalServerURL;
const RealServer_URL = process.env.RealServerURL;

async function getQuestionDetailData(question_id:number, question_type:string, navigate: NavigateFunction){
    const response = await fetch(`/question/problem/${question_id}/${question_type}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).catch((err) => err)

    if(!response.ok){
        navigate('/workbook');
    }

    return response.json()
}

export default getQuestionDetailData;
