import React, {ReactEventHandler} from 'react';
import styles from './WorkbookListViewPresenter.module.css'
import publicAnimations from 'stylesheets/public/animation.module.css';
import {ReactComponent as GaiqLogo} from 'assets/images/workbook/listview/gaiq_logo.svg';
import {ReactComponent as ListViewLogo} from 'assets/images/workbook/listview/listview_logo_yellow.svg';
import {ReactComponent as EyeImage} from 'assets/images/workbook/listview/eye_image_yellow.svg';
import WorkbookElement from "./WorkbookElement";
import TopViewWorkbookElement from "./TopViewWorkbookElement";
import {WorkbookDataType} from 'components/workbook/type/WorkbookDataType';
import MoreBtnContainer from "./more-btn/MoreBtnContainer";

type workbookListViewPropsType = {
    categoryData: {
        activeMenu: string,
        activeMenuId: number,
    },
    workbookData: WorkbookDataType[] | null,
    favoriteWorkbookData: WorkbookDataType[],
    filterActive: string,
    filterOnClickHandler: ReactEventHandler,
}

function WorkbookListViewPresenter({categoryData, workbookData, favoriteWorkbookData, filterActive, filterOnClickHandler}: workbookListViewPropsType){
    return (
        <div className={`${styles.workbook_listview_root} ${publicAnimations.fade_in}`}>
            <div className={styles.favorite_container}>
                <div className={styles.favorite_header}>
                    <GaiqLogo width="50px" height="50px"/>
                    <span>{categoryData ? categoryData['activeMenu'] : 'Loading'}</span>
                </div>
                <div className={styles.favorite_help_container}>
                    <EyeImage width="36px" height="36px" />
                    <span>사람들이 가장 많이 찾아본 문제에요!</span>
                </div>
                <div className={styles.favorite_content_container}>
                    {favoriteWorkbookData ? favoriteWorkbookData.map((data: WorkbookDataType) => {
                        if(data && categoryData['activeMenu'] === data['question_type']){
                            return <TopViewWorkbookElement
                                key={data['question_id']}
                                question_id={data['question_id']}
                                question_type={data['question_type']}
                                question_name={data['question_name']}
                                question_view={data['question_view']}
                                question_create={data['question_create']}
                                question_tag={data['question_tag']}
                            />
                        }
                    }) : null}
                </div>
            </div>
            <div className={`${styles.listview_root} ${publicAnimations.fade_in}`}>
                <div className={styles.listview_header}>
                    <div className={styles.listview_title_container}>
                        <ListViewLogo width="36px" height="36px"/>
                        <span>전체</span>
                    </div>
                    <div className={styles.listview_filter_container}>
                        <div id="sortViewed" className={`${styles.filter_element} ${filterActive === 'sortViewed' ? styles.active : ''}`} onClick={filterOnClickHandler}><span>조회순</span></div>
                        <div id="sortLatest" className={`${styles.filter_element} ${filterActive === 'sortLatest' ? styles.active : ''}`} onClick={filterOnClickHandler}><span>최신순</span></div>
                        <div id="sortOldest" className={`${styles.filter_element} ${filterActive === 'sortOldest' ? styles.active : ''}`} onClick={filterOnClickHandler}><span>오래된순</span></div>
                    </div>
                </div>
                <div className={styles.listview_body}>
                    { workbookData ? workbookData.map((data: WorkbookDataType) => {
                        if(data && categoryData['activeMenu'] === data['question_type']){
                            return <WorkbookElement
                                key={data['question_id']}
                                question_id={data['question_id']}
                                question_type={data['question_type']}
                                question_name={data['question_name']}
                                question_view={data['question_view']}
                                question_create={data['question_create']}
                                question_tag={data['question_tag']}
                            />
                        }
                    }) : null}
                </div>
                <div className={styles.listview_more_btn_container}>
                    <MoreBtnContainer />
                </div>
            </div>
        </div>
    );
}

export default WorkbookListViewPresenter;
