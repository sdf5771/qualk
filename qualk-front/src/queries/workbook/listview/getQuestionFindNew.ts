const BASE_URL = process.env.LocalServerURL;

async function getQuestionFindNew(pageNumber:number){
    const response = await fetch(`question/find_new/${pageNumber}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    console.log('res ', response);

    return response.json()
}

export default getQuestionFindNew;
