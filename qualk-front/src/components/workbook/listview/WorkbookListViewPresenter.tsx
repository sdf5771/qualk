import React from 'react';
import styles from './WorkbookListViewPresenter.module.css'

const themeData = [
    {},
    {},
    {},
]

type workbookListViewPropsType = {
    categoryData: {
        activeMenu: string,
        activeMenuId: number,
    },
}

function WorkbookListViewPresenter({categoryData}: workbookListViewPropsType){
    return (
        <div className={styles.workbook_listview_root}>
            <div className={styles.favorite_container}>
                <div className={styles.favorite_header}>
                    <div></div>
                    <span>{categoryData ? categoryData['activeMenu'] : 'Loading'}</span>
                </div>
                <div className={styles.favorite_help_container}>
                    <div></div>
                    <span>사람들이 가장 많이 찾아본 문제에요!</span>
                </div>
                <div className={styles.favorite_content_container}>

                </div>
            </div>
            <div className={styles.listview_root}>
                <div className={styles.listview_header}>
                    <div className={styles.listview_title_container}>
                        <div></div>
                        <span>전체</span>
                    </div>
                    <div className={styles.listview_filter_container}>
                        <div className={styles.filter_element}><span>조회순</span></div>
                        <div className={styles.filter_element}><span>최신순</span></div>
                        <div className={styles.filter_element}><span>오래된순</span></div>
                    </div>
                </div>
                <div className={styles.listview_body}>

                </div>
            </div>
        </div>
    );
}

export default WorkbookListViewPresenter;
