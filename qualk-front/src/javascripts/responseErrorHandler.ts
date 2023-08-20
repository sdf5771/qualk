import getAccessToken from "queries/auth/getAccessToken";

async function responseErrorHandler(response: Response){
    console.log('response ', response);

    const replaceAccessToken = async () => {
        let res = await getAccessToken();
        let result = await res.json()

        localStorage.removeItem('accessToken');

        localStorage.setItem('accessToken', result.accessToken);
    }

    if(!response.ok){
        switch (response.status){
            case 401:
                //accessToken 만료 
                await replaceAccessToken();

                return Error;
        }
    }

    return response.json();
}

export default responseErrorHandler;