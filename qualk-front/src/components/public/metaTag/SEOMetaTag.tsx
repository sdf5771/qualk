import React from 'react';
import {Helmet} from 'react-helmet-async';

type SEOMetaTagPropsType = {
    title: string;
    description: string;
    imgSrc: string;
    url: string;
    keywords: string;
}

const SEOMetaTag = ({title, description, imgSrc, url, keywords}: SEOMetaTagPropsType) => {
    console.log('keywords ', keywords);
    return(
        <Helmet>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:site_name" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imgSrc} />
            <meta property="og:url" content={url} />

            <meta property="twitter:type" content="website" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:site_name" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={imgSrc} />
            <meta property="twitter:url" content={url} />
            <link rel="canonical" href={url} />
            <link rel="alternate" hrefLang="ko" href={url} />
        </Helmet>
    );
}

export default SEOMetaTag;
