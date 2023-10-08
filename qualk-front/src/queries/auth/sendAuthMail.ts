async function sendAuthMail(userId: string){
    let response = await fetch(`/api/v1/login/add_auth_email?userid=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json();
}

export default sendAuthMail;