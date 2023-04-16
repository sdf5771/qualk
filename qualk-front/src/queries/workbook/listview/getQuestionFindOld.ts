async function getQuestionFindOld(type: string, pageNumber:number){
    const response = await fetch(`https://qualk.co.kr/api/v1/quiz/${type}/old/${pageNumber}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return response.json()
}

export default getQuestionFindOld;
