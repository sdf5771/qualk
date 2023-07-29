async function getQuestionList(type: string, listType: string, pageNumber:number, pageSize: number){
    //http://localhost:3000/api/v1/quiz/list?_type=GAIQ&list_type=view&page=0&page_size=6
    const response = await fetch(`/api/v1/quiz/list?_type=${type}&list_type=${listType}&page=${pageNumber}&page_size=${pageSize}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return response.json()
}

export default getQuestionList;