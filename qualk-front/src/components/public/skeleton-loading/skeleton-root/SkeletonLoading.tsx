import React from 'react';
import styles from "./SkeletonLoading.module.css";

function SkeletonLoading({type}: {type: string}){
    let classes

    switch (type) {
        case 'title':
            classes = styles.title;
            break;
        case 'text':
            classes = styles.text;
            break;
        case 'avatar':
            classes = styles.avatar;
            break;
        case 'thumbnail':
            classes = styles.thumbnail;
            break;
    }

    return (
        <div className={`${styles.skeleton} ${classes}`}></div>
    )
}

export default SkeletonLoading;