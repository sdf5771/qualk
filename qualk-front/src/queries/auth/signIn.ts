async function signIn({email, password}: {email: string, password: string}){
    let data = {
        "userId": email,
        "password": password,
      }

    const response = await fetch(`/api/v1/login/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((res) => {
        if(!res.ok && res.status !== 200) throw Error(res.statusText);

        return res;
    })
    
    return response.json();
}

export default signIn;
