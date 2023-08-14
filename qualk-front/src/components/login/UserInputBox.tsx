import React from 'react';
import styles from './UserInputBox.module.css';

type TUserInputBoxPropsType = {
    type: 'id' | 'pw',
    title: string,
    inputOption?: {
        placeHolderText?: string,
        inputVal?: string,
        onChangeHandler?: React.ChangeEventHandler<HTMLInputElement>,
        errorMsg?: string,
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
                <input 
                    type={type === 'pw' ? 'password' : 'email'}
                    minLength={type === 'pw' ? 8 : 2}
                    maxLength={type === 'pw' ? 15 : 100}
                    onChange={inputOption && inputOption.onChangeHandler ? inputOption.onChangeHandler : () => {}} 
                    value={inputOption && inputOption.inputVal ? inputOption.inputVal : ''}
                    placeholder={inputOption && inputOption.placeHolderText ? inputOption.placeHolderText : ''}
                    />
            </div>
            <div className={styles.error_container}>
                <span>{inputOption?.errorMsg ? inputOption.errorMsg : ''}</span>
            </div>
        </div>
    )
}

export default UserInputBox;