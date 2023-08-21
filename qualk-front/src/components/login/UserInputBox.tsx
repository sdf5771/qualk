import React from 'react';
import styles from './UserInputBox.module.css';

type TUserInputBoxPropsType = {
    type: 'id' | 'pw',
    title: string,
    inputOption?: {
        placeHolderText?: string,
        inputVal?: string,
        onChangeHandler?: React.ChangeEventHandler<HTMLInputElement>,
        onKeyUpHandler? :React.KeyboardEventHandler<HTMLInputElement>,
        errorMsg?: string,
        isError?: boolean,
    }
}

function UserInputBox({type, title, inputOption}: TUserInputBoxPropsType){
    
    return (
        <div className={styles.inputbox_root}>
            {title ? 
            <div className={styles.title}>
                <span>{title}</span>
            </div> : null}
            <div className={styles.input_container}>
                {type === 'id' ? 
                <input 
                    type='email'
                    minLength={2}
                    maxLength={100}
                    onChange={inputOption && inputOption.onChangeHandler ? inputOption.onChangeHandler : () => {}} 
                    onKeyUp={inputOption && inputOption.onKeyUpHandler ? inputOption.onKeyUpHandler : () => {}}
                    value={inputOption && inputOption.inputVal ? inputOption.inputVal : ''}
                    placeholder={inputOption && inputOption.placeHolderText ? inputOption.placeHolderText : ''}
                    />
                : 
                <input 
                    type='password'
                    minLength={8}
                    maxLength={15}
                    onChange={inputOption && inputOption.onChangeHandler ? inputOption.onChangeHandler : () => {}} 
                    onKeyUp={inputOption && inputOption.onKeyUpHandler ? inputOption.onKeyUpHandler : () => {}}
                    value={inputOption && inputOption.inputVal ? inputOption.inputVal : ''}
                    placeholder={inputOption && inputOption.placeHolderText ? inputOption.placeHolderText : ''}
                    autoComplete='off'
                    />
                }
            </div>
            <div className={styles.error_container}>
                <span>{inputOption?.isError && inputOption?.errorMsg ? inputOption.errorMsg : ''}</span>
            </div>
        </div>
    )
}

export default UserInputBox;