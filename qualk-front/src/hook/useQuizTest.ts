import React from 'react';
import { useMutation } from '@tanstack/react-query';
import createQuizTest from 'queries/workbook/quiz-test/createQuizTest';

type TuseQuizTest = {
    type: string,
    testName: string,
    userId: string,
}

function useQuizTest({type, testName, userId}: TuseQuizTest){
    const { mutate, isLoading, isError, error, isSuccess } = useMutation(() => createQuizTest({type, testName, userId}));
    
    return { mutate, isLoading, isError, error, isSuccess }
}

export default useQuizTest;