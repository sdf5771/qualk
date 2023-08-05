import React, {useState} from 'react';
import styles from './LicenseCard.module.css';
import {ReactComponent as NoContents} from 'assets/images/main/license/need_update.svg';

type TLicenseCardProps = {
    ImageComponent: React.ReactNode;
    onClickHandler?: React.MouseEventHandler<HTMLDivElement>;
    isUsed: boolean;
}

function LicenseCard({ImageComponent, onClickHandler, isUsed}: TLicenseCardProps){
    const [isHover, setIsHover] = useState(false);

    return(
        <div 
            onMouseOver={() => setIsHover(true)} 
            onMouseOut={() => setIsHover(false)} 
            onClick={onClickHandler ? onClickHandler : () => {}} 
            className={`${styles.card_root} ${isUsed ? '' : styles.need_update}`}>
            <div className={styles.image_container}>
                {isHover && !isUsed ? <NoContents /> : ImageComponent}
            </div>
        </div>
    )
}

export default LicenseCard;