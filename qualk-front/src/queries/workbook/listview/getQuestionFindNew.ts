const LocalServer_URL = process.env.LocalServerURL;
const RealServer_URL = process.env.RealServerURL;

async function getQuestionFindNew(type: string, pageNumber:number){
        // `/question/find_new/${type}/${pageNumber}`
    const response = await fetch(`http://localhost:8000/api/v1/quiz/${type}/new/${pageNumber}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return response.json()
}

export default getQuestionFindNew;
