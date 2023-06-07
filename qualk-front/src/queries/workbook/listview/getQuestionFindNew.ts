async function getQuestionFindNew(type: string, pageNumber:number){
    const response = await fetch(`/api/v1/quiz/${type}/new/${pageNumber}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return response.json()
}

export default getQuestionFindNew;