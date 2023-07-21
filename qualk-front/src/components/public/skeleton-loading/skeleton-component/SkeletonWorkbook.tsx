import React from 'react';
import styles from './SkeletonWorkbook.module.css';
import SkeletonLoading from '../skeleton-root/SkeletonLoading';

function SkeletonWorkbook(){
    return(
        <div className={styles.skeleton_workbook_root}>
            <div className={styles.title_container}>
                <SkeletonLoading type="title" />
            </div>
            <div className={styles.body_container}>
                <SkeletonLoading type="text" />
                <SkeletonLoading type="text" />
                <SkeletonLoading type="text" />
            </div>
        </div>
    )
}

export default SkeletonWorkbook;