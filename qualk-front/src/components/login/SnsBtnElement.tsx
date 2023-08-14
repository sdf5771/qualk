import React from 'react';
import styles from './SnsBtnElement.module.css';

type TSnsBtnElement = {
    BtnLogo?: string,
    onClickHandler?: React.MouseEventHandler<HTMLButtonElement>,
}

function SnsBtnElement({BtnLogo, onClickHandler}: TSnsBtnElement){
    return (
        <button onClick={onClickHandler} className={styles.sns_btn_element_root}><img src={BtnLogo} /></button>
    )
}

export default SnsBtnElement;