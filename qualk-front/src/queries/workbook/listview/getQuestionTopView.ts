const LocalServer_URL = process.env.LocalServerURL;
const RealServer_URL = process.env.RealServerURL;

async function getQuestionTopView(type:string){
    const response = await fetch(`http://localhost:8000/api/v1/quiz/${type}/top_3`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return response.json()
}

export default getQuestionTopView;
