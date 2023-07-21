import React from 'react';
import styles from './SkeletonTopViewWorkbook.module.css'
import SkeletonLoading from '../skeleton-root/SkeletonLoading';

function SkeletonTopViewWorkbook(){
    return(
        <div className={styles.skeleton_topview_root}>
            <div>
                <SkeletonLoading type="title" />
            </div>
            <div className={styles.body_container}>
                <div className={styles.content_container}>
                    <SkeletonLoading type="text" />
                    <SkeletonLoading type="text" />
                    <SkeletonLoading type="text" />
                </div>
                <div>
                    <SkeletonLoading type="text" />
                </div>
            </div>
        </div>
    )
}

export default SkeletonTopViewWorkbook;