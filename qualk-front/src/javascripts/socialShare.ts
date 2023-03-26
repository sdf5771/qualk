import React from "react";

export default function socialShare(social:string){
    const baseUrl = document.URL;
    const snsTitle = 'Qualk'

    switch (social){
        case 'facebook':
            window.open("http://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(baseUrl) + "&text" + encodeURIComponent(social), "", "width=486, height=286");
            break
        case 'twitter':
            window.open("http://twitter.com/share?url=" + encodeURIComponent(baseUrl) + "&text" + encodeURIComponent(snsTitle), "", "width=486, height=286");
            break
        case 'instagram':
            alert("현재 지원하지 않는 기능입니다.")
            break
        case 'kakao':
            try {
                const KAKAO_JS_API_KEY = process.env.REACT_APP_KAKAO_JS_API_KEY;
                // @ts-ignore
                if(window.Kakao){
                    // @ts-ignore
                    const kakao = window.Kakao;

                    if(!kakao.isInitialized()){
                        kakao.init(KAKAO_JS_API_KEY);
                    }

                    // @ts-ignore
                    kakao.Share.sendScrap({
                        templateId: 91754,
                        requestUrl: baseUrl,
                    });
                }
            }catch(e){
                throw new Error("에러가 발생하였습니다.")
            }
            break
        case 'email':
            alert("현재 지원하지 않는 기능입니다.")
            break
    }
}
