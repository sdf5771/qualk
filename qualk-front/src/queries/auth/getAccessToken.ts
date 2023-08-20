
async function getAccessToken(){
    const ACCESSTOKEN = localStorage.getItem('accessToken');
    let response = await fetch(`/api/v1/login/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: ACCESSTOKEN ? ACCESSTOKEN : '',
        },
    });

    return response;
}

export default getAccessToken;