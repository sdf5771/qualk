async function getUserAuth({email, password}: {email: string, password: string}){
    const response = await fetch(``,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return response.json()
}

export default getUserAuth;