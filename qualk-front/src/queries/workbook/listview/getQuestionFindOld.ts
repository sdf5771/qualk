const BASE_URL = process.env.LocalServerURL;

async function getQuestionFindOld(){
    const response = await fetch('question/find_old',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    console.log('res ', response);

    return response.json()
}

export default getQuestionFindOld;
