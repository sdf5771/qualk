import React, {useState} from 'react';
import styles from './LicenseCard.module.css';
import publicAnimations from 'stylesheets/public/animation.module.css';
import {ReactComponent as NoContents} from 'assets/images/main/license/need_update.svg';

type TLicenseCardProps = {
    ImageComponent: React.ReactNode;
    onClickHandler?: React.MouseEventHandler<HTMLDivElement>;
    isUsed: boolean;
    title: string;
    agency: string;
}

function LicenseCard({ImageComponent, onClickHandler, isUsed, title, agency}: TLicenseCardProps){
    return(
        <div
            onClick={onClickHandler ? onClickHandler : () => {}} 
            className={`${styles.card_root} ${isUsed ? '' : styles.need_update}`}>
            <div className={styles.img_container}>
                {ImageComponent}
            </div>
            <div className={styles.text_wrapper}>
                <span>{title}</span>
                <span>{agency}</span>
            </div>
        </div>
    )
}

export default LicenseCard;