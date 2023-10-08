
async function passwordChangeRequest({token, password} : {token: string, password: string}){
    const ACCESSTOKEN = localStorage.getItem('accessToken');
    let data = {
        token: token,
        newPassword: password
      }
    let response = await fetch(`/api/v1/login/refresh_password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: ACCESSTOKEN ? ACCESSTOKEN : '',
        },
        body: JSON.stringify(data),
    });

    return response;
}

export default passwordChangeRequest;