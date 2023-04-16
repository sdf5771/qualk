const LocalServer_URL = process.env.LocalServerURL;
const RealServer_URL = process.env.RealServerURL;

async function getQuestionFindView(type: string, pageNumber: number){
    // `/question/find_view/${type}/${pageNumber}`
    const response = await fetch(`api/v1/quiz/${type}/view/${pageNumber}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return response.json()
}

export default getQuestionFindView;
