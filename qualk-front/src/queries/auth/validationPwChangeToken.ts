async function validationPwChangeToken(token : string){
    let response = await fetch(`/api/v1/login/refresh_auth_email/?token=${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json();
}

export default validationPwChangeToken;
