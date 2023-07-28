import React from 'react';
import { useQuery } from '@tanstack/react-query';
import getTransLangData from 'queries/workbook/listview/getTransLangData';

type TuseTransLanguageQuizData = {
    lang: string;
    testId: string;
    type: string;
}

function useTransLanguageQuizData({ lang, testId, type }:TuseTransLanguageQuizData){
    const { isLoading, isError, data, error, refetch } = useQuery(['transData', testId, lang], () => getTransLangData(type, testId, lang));
    
    return { isLoading, isError, data, error, refetch }
}

export default useTransLanguageQuizData;