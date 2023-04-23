async function getSearchResult(keyword: string, type: string){
    const response = await fetch(`/api/v1/quiz/search?keyword=${keyword}&type=${type}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return response.json()
}

export default getSearchResult;
