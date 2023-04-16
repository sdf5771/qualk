async function getQuestionFindView(type: string, pageNumber: number){
    const response = await fetch(`http://localhost:8000/api/v1/quiz/${type}/view/${pageNumber}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return response.json()
}

export default getQuestionFindView;
