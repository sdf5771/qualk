const LocalServer_URL = process.env.LocalServerURL;
const RealServer_URL = process.env.RealServerURL;

async function getQuestionFindOld(type: string, pageNumber:number){
    const response = await fetch(`http://localhost:8000/api/v1/quiz/${type}/old/${pageNumber}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return response.json()
}

export default getQuestionFindOld;
