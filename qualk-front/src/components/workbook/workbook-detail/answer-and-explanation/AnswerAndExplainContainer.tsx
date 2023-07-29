import React, {useState, useEffect} from 'react';
import AnswerAndExplainPresenter from "./AnswerAndExplainPresenter";

type AnswerAndExplainContainerPropsType = {
    quizList: string[] | null,
    correctIndex: number | null,
    description: string | null,
    referenceData: string | null,
}

//contentList, correctIndex, description, reference

function AnswerAndExplainContainer({quizList, correctIndex, description, referenceData}: AnswerAndExplainContainerPropsType){
    const [answer, setAnswer] = useState('');
    useEffect(() => {
        if(quizList !== null && correctIndex !== null){
            quizList.forEach((quizStr, index) => {
                if(correctIndex === index){
                    setAnswer(quizStr);
                }
            });
        }
    }, [quizList, correctIndex]);

    return(
        <AnswerAndExplainPresenter description={description} referenceData={referenceData} answer={answer} />
    )
}

export default AnswerAndExplainContainer
