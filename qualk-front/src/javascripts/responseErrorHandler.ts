import getAccessToken from "queries/auth/getAccessToken";
import store from "store/store";

async function responseErrorHandler(response: Response){
    const replaceAccessToken = async () => {
        let res = await getAccessToken();
        let result = await res.json()

        localStorage.removeItem('accessToken');

        localStorage.setItem('accessToken', result.accessToken);
    }

    const newRes = await response.json();
    
    if(!response.ok){
        switch (response.status){
            case 401:
                if(newRes.detail === 'Token expired'){
                    //accessToken 만료 
                    await replaceAccessToken();
                    
                } else if(newRes.detail === 'Not token'){
                    store.dispatch({type: 'toast open', toastType: 'warning', toastMsg: '로그인이 필요한 기능입니다.'});

                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 1500);
                }

                return Error;
            case 500:
                store.dispatch({type: 'toast open', toastType: 'warning', toastMsg: '로그인 서버에 오류가 발생하였습니다.'});
        }
    }

    return response.json();
}

export default responseErrorHandler;