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
import NoContents from "components/public/no-contents/NoContents";
import SkeletonComponent from "components/public/skeleton-loading/skeleton-component";
import Shimmer from 'components/public/skeleton-loading/shimmer/Shimmer';

type workbookListViewPropsType = {
    menuName: string,
    workbookData: WorkbookDataType[] | null,
    favoriteWorkbookData: WorkbookDataType[],
    filterActive: string,
    filterOnClickHandler: ReactEventHandler,
    totalPage : number,
    currentPage: number,
    setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>,
    workBookIsLoading: boolean, 
    favIsLoading: boolean
}

function WorkbookListViewPresenter({menuName, workbookData, totalPage, currentPage, favoriteWorkbookData, filterActive, filterOnClickHandler, setCurrentPageNumber, workBookIsLoading, favIsLoading}: workbookListViewPropsType){
    const uniqueWorkbookElement = React.useMemo(() => {
        const map = new Map();
        if(workbookData){
            workbookData.forEach((data) => {
                if(data){
                    map.set(data.contentId, data)
                }
            })
            return Array.from(map.values());
        }
    }, [workbookData])
    
    if(menuName === "GAIQ"){
        return (
            <div className={`${styles.workbook_listview_root} ${publicAnimations.fade_in}`}>
                <div className={styles.favorite_container}>
                    <div className={styles.favorite_header}>
                        <GaiqLogo width="50px" height="50px"/>
                        <span>{menuName ? menuName : 'Loading'}</span>
                    </div>
                    <div className={styles.favorite_help_container}>
                        <EyeImage width="36px" height="36px" />
                        <span>사람들이 가장 많이 찾아본 문제에요!</span>
                    </div>
                    <div className={styles.favorite_content_container}>
                        {favIsLoading ? 
                            <>
                                <Shimmer />
                                <SkeletonComponent.SkeletonTopViewWorkbook />
                                <SkeletonComponent.SkeletonTopViewWorkbook />
                                <SkeletonComponent.SkeletonTopViewWorkbook />
                            </>
                        : null}

                        {favoriteWorkbookData ? favoriteWorkbookData.map((data: WorkbookDataType) => {
                            if(data && menuName === data.type){
                                return <TopViewWorkbookElement
                                    key={`${data.type}-${data.contentId}-top3`}
                                    contentId={data.contentId}
                                    type={data.type}
                                    title={data.title}
                                    view={data.view ? data.view : 0}
                                    create={data.create ? data.create : ''}
                                    tag={data.tag ? data.tag : []}
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
                        {workBookIsLoading || workbookData?.length === 0 ? 
                        <>
                            <Shimmer />
                            <SkeletonComponent.SkeletonWorkbook />
                            <SkeletonComponent.SkeletonWorkbook />
                            <SkeletonComponent.SkeletonWorkbook />
                            <SkeletonComponent.SkeletonWorkbook />
                            <SkeletonComponent.SkeletonWorkbook />
                            <SkeletonComponent.SkeletonWorkbook />
                        </>
                        : null}

                        { uniqueWorkbookElement ? uniqueWorkbookElement.map((data: WorkbookDataType, index) => {
                            if(data && menuName === data.type){
                                return <WorkbookElement
                                    key={`${data.type}-${data.contentId}`}
                                    contentId={data.contentId}
                                    type={data.type}
                                    title={data.title}
                                    view={data.view}
                                    create={data.create}
                                    tag={data.tag}
                                />
                            }
                        }) : 
                        null
                        }
                    </div>
                    <div className={styles.listview_more_btn_container}>
                        {totalPage === currentPage ? null : <MoreBtnContainer filterActive={filterActive} currentPage={currentPage} setCurrentPageNumber={setCurrentPageNumber}/>}
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className={`${styles.workbook_listview_root} ${publicAnimations.fade_in}`}>
                <div className={styles.favorite_container}>
                    <div className={styles.favorite_header}>
                        <GaiqLogo width="50px" height="50px"/>
                        <span>{menuName ? menuName : 'Loading'}</span>
                    </div>
                    <div className={styles.no_contents_container}>
                        <NoContents />
                    </div>
                </div>
            </div>
        );
    }
}

export default WorkbookListViewPresenter;
