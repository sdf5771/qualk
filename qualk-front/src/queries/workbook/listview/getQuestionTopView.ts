const BASE_URL = process.env.LocalServerURL;

async function getQuestionTopView(){
    const response = await fetch('question/top_3',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    console.log('res ', response);

    return response.json()
}

export default getQuestionTopView;
