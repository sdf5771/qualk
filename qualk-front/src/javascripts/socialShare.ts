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
                    kakao.Share.sendDefault({
                        objectType: 'feed',
                        content: {
                            title: 'Qualk',
                            description: '여러분의 시험준비, 해결 해드릴게요!',
                            imageUrl:
                                'https://qualk.co.kr/logo512.png',
                            link: {
                                mobileWebUrl: baseUrl,
                                webUrl: baseUrl,
                            },
                        },
                    })
                    // kakao.Share.sendScrap({
                    //     templateId: 91754,
                    //     requestUrl: baseUrl,
                    // });
                    //
                    // kakao.Share.sendCustom({
                    //     templateId: 91754,
                    //     templateArgs: {
                    //         title: '라이언이 즐겨먹던 바로 그 틴케이스 치즈볼',
                    //         description: '바라만 봐도 즐거워지는 힐링 패키지에는 시크릿 스토리가 숨어있어요.',
                    //     },
                    // });
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
