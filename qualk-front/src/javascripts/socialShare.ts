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
            break
        case 'kakao':
            break
        case 'email':
            break
    }
}
