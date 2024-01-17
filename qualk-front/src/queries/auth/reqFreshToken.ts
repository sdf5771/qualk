async function reqFreshToken(){
    const ACCESSTOKEN = localStorage.getItem('accessToken');
    let data = {
        accessToken: ACCESSTOKEN
    }
    let response = await fetch(`/api/v1/login/access`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: ACCESSTOKEN ? `Bearer ${ACCESSTOKEN}` : '',
        },
        body: JSON.stringify(data)
    });
    
    return response;
}

export default reqFreshToken;