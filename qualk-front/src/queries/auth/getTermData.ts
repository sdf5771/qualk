async function getTermData(){
    let response = await fetch(`/api/v1/signup/terms`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json();
}

export default getTermData;
