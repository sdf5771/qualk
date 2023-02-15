import React from 'react';
import styles from 'stylesheets/workbook/WorkbookPresenter.module.css';
import styled from 'styled-components';
import SideBarContainer from "../../components/workbook/sidebarmenu/SideBarMenuContainer";
import SearchBarContainer from "../../components/public/searchbar/SearchBarContainer";
import WorkbookListViewContainer from "../../components/workbook/listview/WorkbookListViewContainer";

const LogoTitle = styled.span`
    color: #ff9300;
    font-size: 2.25rem;
    font-family: bc-alphapipe, sans-serif;
    font-weight: bold;
    letter-spacing: -1.44px;
`;

function WorkbookPresenter(){
    return(
        <div className={styles.workbook_main}>
            <div className={styles.workbook_header}>
                <div className={styles.logo_container}>
                    <div className={styles.logo_img}></div>
                    <LogoTitle>Qualk</LogoTitle>
                </div>
                <SearchBarContainer />
            </div>
            <div className={styles.workbook_body}>
                <div className={styles.left_side_container}>
                    <SideBarContainer />
                </div>
                <div className={styles.right_side_container}>
                    <WorkbookListViewContainer />
                </div>
            </div>
        </div>
    );
}

export default WorkbookPresenter;
