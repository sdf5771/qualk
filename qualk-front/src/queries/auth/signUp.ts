
async function signUp({email, password, agreeTermsData}: {email: string, password: string, agreeTermsData: number[]}){
    let data = {
        "userId": email,
        "password": password,
        "terms": [...agreeTermsData],
      }

    const response = await fetch(`/api/v1/signup/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then((res) => {
        if(!res.ok && res.status === 409) throw Error('이미 존재하는 아이디에요.')
        if(!res.ok && res.status !== 200 && res.body) throw Error('문제가 발생했어요 다시 시도해주세요.');

        return res;
    })
    
    return response.json();
}

export default signUp;