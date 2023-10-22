import React, {useState, useEffect} from 'react';
import styles from './QuizSelectShortcutElement.module.css'

type TQuizSelectShortcutElement = {
    title : string,
    description : string,
    quizType : number,
    onClickHandler? : React.MouseEventHandler<HTMLDivElement>,
}
const defaultTheme = {
    10: {
        bgColor: '#ffba00',
        fontColor: '#ffba00',
    },
    20: {
        bgColor: '#ff9300',
        fontColor: '#ff9300',
    },
    30: {
        bgColor: '#ff6c00',
        fontColor: '#ff6c00',
    }
}
type TdefaultTheme = {
    bgColor: string,
    fontColor: string,
}
function QuizSelectShortcutElement({title, description, quizType, onClickHandler} : TQuizSelectShortcutElement){
    const [theme, setTheme] = useState<TdefaultTheme | null>(null);
    useEffect(() => {
        if (quizType === 10){
            setTheme(defaultTheme[10])
        } else if (quizType === 20){
            setTheme(defaultTheme[20])
        } else if(quizType === 30){
            setTheme(defaultTheme[30])
        }
    }, [quizType])

   
    return (
        <div onClick={onClickHandler ? onClickHandler : () => {}} className={styles.quiz_select_shortcut_root}>
            <div className={styles.header_container}>
                <div className={styles.first_color_box} style={{backgroundColor: theme ? theme.bgColor : ''}}>
                    <span>{quizType}문제</span>
                </div>
                <div className={styles.second_color_box}>
                    <span style={{color: theme ? theme.fontColor : ''}}>응시시간 {quizType}분</span>
                </div>
            </div>
            <div className={styles.text_container}>
                <span className={styles.title}>{title}</span>
                <span className={styles.description}>{description}</span>
            </div>
        </div>
    )
}

export default QuizSelectShortcutElement