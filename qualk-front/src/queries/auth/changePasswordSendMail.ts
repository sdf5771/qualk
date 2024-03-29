
async function changePasswordSendMail(userId: string){
    const ACCESSTOKEN = localStorage.getItem('accessToken');
    let data = {
        userId
    }
    let response = await fetch(`/api/v1/login/change_password_auth_email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: ACCESSTOKEN ? ACCESSTOKEN : '',
        },
        body: JSON.stringify(data),
    });

    return response;
}

export default changePasswordSendMail;