
async function changePasswordSendMail(userId: string){
    const ACCESSTOKEN = localStorage.getItem('accessToken');
    let response = await fetch(`/api/v1/login/change_password_auth_email?userid=${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: ACCESSTOKEN ? ACCESSTOKEN : '',
        },
    });

    return response;
}

export default changePasswordSendMail;