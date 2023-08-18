async function getSearchResult(keyword: string, type: string){
    const response = await fetch(`/api/v1/quiz/list?_type=all&page=1&page_size=200&serach=${keyword}&search_type=${type}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return response.json()
}

export default getSearchResult;
