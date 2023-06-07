async function getQuestionTopView(type:string){
    const response = await fetch(`/api/v1/quiz/${type}/top_3`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    
    return response.json()
}

export default getQuestionTopView;
