import React, { FunctionComponent } from 'react';
import { useMediaQuery } from 'react-responsive';

type Tchildren = {
    children: React.ReactNode
}

export const ReponsiveMobile = ({children}: Tchildren) => {
    const isMobile = useMediaQuery({
        query : "(max-width: 768px)"
    });

    return <>{isMobile && children}</>
}

export const ReponsiveTabletPC = ({children}: Tchildren) => {
     const isTabletPC = useMediaQuery({
        query : "(min-width: 769px) and (max-width: 1024px)"
     })

     return <>{isTabletPC && children}</>
}

export const ReponsivePC = ({children}: Tchildren) => {
    const isPC = useMediaQuery({
        query : "(min-width: 1025px)"
    })

    return <>{isPC && children}</>
}