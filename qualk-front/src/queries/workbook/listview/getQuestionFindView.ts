const BASE_URL = process.env.LocalServerURL;

async function getQuestionFindView(pageNumber: number){
    const response = await fetch(`question/find_view/${pageNumber}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    console.log('res ', response);

    return response.json()
}

export default getQuestionFindView;
