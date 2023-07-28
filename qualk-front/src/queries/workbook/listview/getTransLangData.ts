async function getTransLangData(type: string, testId: string, lang: string){
    const response = await fetch(`/api/v1/quiz/?content_type=${type}&content_id=${testId}&lang=${lang}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return response.json()
}

export default getTransLangData;