const BASE_URL = process.env.LocalServerURL;

async function getQuestionFindNew(type: string, pageNumber:number){
    const response = await fetch(`question/find_new/${type}/${pageNumber}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    console.log('res ', response);

    return response.json()
}

export default getQuestionFindNew;
