import React, {useState, useEffect} from 'react';
import styles from './TermList.module.css';
import {ReactComponent as RightArrow} from 'assets/images/createAccount/right_arrow.svg';
import { useDispatch } from 'react-redux';
import {TtermData} from 'javascripts/termData';
import { useQuery } from '@tanstack/react-query';
import getTermData from 'queries/auth/getTermData';


function TermList(){
    const {isLoading, isError, data, error, refetch} = useQuery(['termData'], getTermData, {staleTime: 100000});
    const dispatch = useDispatch();   
    const [termList, setTermList] = useState<TtermData[]>([]);


    const isAllRequiredAgreed = (data: TtermData[]): boolean => {
        const requiredAgreeItems = data.filter(item => item.isRequired === 1 && item.isAgree === 0);
        return requiredAgreeItems.length === 0;
    };

    useEffect(() => {
        if(data){
            const newTermArray: TtermData[] = [];

            data.forEach((term: TtermData) => {
                let newTermData = term;
                newTermData.isAgree = 0;

                newTermArray.push(newTermData);
            })

            setTermList(newTermArray);
        }
    }, [data])
        
    useEffect(() => {
        if(termList && isAllRequiredAgreed(termList)){
            dispatch({type: 'termList all agreed'});
            dispatch({type: 'termListData mutate', termListData: termList})
        } else {
            dispatch({type: 'termList not agreed'});
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
                                term.isAgree = 1;
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
                                    newTermList[index].isAgree = 1;
                                    return newTermList;
                                })
                            }} 
                            className={styles.radio_style} 
                            type="radio" 
                            checked={data.isAgree ? true : false}
                            />
                        <p>{data.isRequired ? <span style={{color: '#ffba00'}}>[필수] </span> : '[선택] '}{data.title}</p>
                        <RightArrow style={{cursor:'pointer'}} onClick={() => {
                            dispatch({type: 'term modal open', title: data.title, content: data.content})
                        }} />
                    </div>
                )
            }) : null}
        </div>
    )
}

export default TermList;