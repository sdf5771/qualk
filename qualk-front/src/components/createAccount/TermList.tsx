import React, {useState, useEffect} from 'react';
import styles from './TermList.module.css';
import {ReactComponent as RightArrow} from 'assets/images/createAccount/right_arrow.svg';
import { useDispatch } from 'react-redux';
import {TtermData, termData} from 'javascripts/termData';

function TermList(){
    const dispatch = useDispatch();
    const [termList, setTermList] = useState(termData);

    const isAllRequiredAgreed = (data: TtermData[]): boolean => {
        const requiredAgreeItems = data.filter(item => item.isRequired && !item.isAgree);
        return requiredAgreeItems.length === 0;
    };

    useEffect(() => {
        if(isAllRequiredAgreed(termList)){
            dispatch({type: 'termList all agreed'});
        }
    }, [termList])

    return (
        <div className={styles.term_list}>
            <div className={styles.all_agree_box}>
                <input 
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setTermList((current) => {
                            let newTermList = [...current];
                            newTermList.forEach((term) => {
                                term.isAgree = true;
                            })
                            return newTermList;
                        })
                    }} 
                    className={styles.radio_style} type="radio" />
                <span>전체 약관 동의</span>
            </div>
            {termList ? termList.map((data: TtermData, index: number) => {
                return (
                    <div key={data.id} className={styles.ordinary_term_box}>
                        <input 
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setTermList((current) => {
                                    let newTermList = [...current];
                                    newTermList[index].isAgree = true;
                                    return newTermList;
                                })
                            }} 
                            className={styles.radio_style} 
                            type="radio" 
                            checked={data.isAgree}
                            />
                        <p>{data.isRequired ? <span style={{color: '#ffba00'}}>[필수] </span> : '[선택] '}{data.title}</p>
                        <RightArrow style={{cursor:'pointer'}} onClick={() => {
                            dispatch({type: 'term modal open', title: data.title, detail: data.detail})
                        }} />
                    </div>
                )
            }) : null}
        </div>
    )
}

export default TermList;