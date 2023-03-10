const BASE_URL = process.env.LocalServerURL;

async function getQuestionFindView(){
    const response = await fetch('question/find_view',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    console.log('res ', response);

    return response.json()
}

export default getQuestionFindView;
