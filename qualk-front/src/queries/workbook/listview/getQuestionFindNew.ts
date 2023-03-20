const LocalServer_URL = process.env.LocalServerURL;
const RealServer_URL = process.env.RealServerURL;
console.log('RealServer_URL ', RealServer_URL);
async function getQuestionFindNew(type: string, pageNumber:number){
    const response = await fetch(`/question/find_new/${type}/${pageNumber}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    console.log('res ', response);

    return response.json()
}

export default getQuestionFindNew;
