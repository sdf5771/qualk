import React, {useState} from 'react';
import SearchBarPresenter from "./SearchBarPresenter";

function SearchBarContainer(){
    const [isActive, setIsActive] = useState(false);
    const [isHover, setIsHover] = useState(false);
    const [inputVal, setInputVal] = useState('');
    const [visibleCloseBtn, setVisibleCloseBtn] = useState(false);
    const inputOnClickHandler = (event: React.MouseEvent) => {
        event.preventDefault()
        setIsActive(true)
    }

    const visibleCloseHandler = (inputValue: string) => {
        if(inputValue.length !== 0){
            setVisibleCloseBtn(true);
        } else {
            setVisibleCloseBtn(false);
        }
    }

    const inputOnChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        const newValue = event.currentTarget.value;
        setInputVal(newValue);
        visibleCloseHandler(newValue);
    }
    const inputOnBlurHandler = (event: React.MouseEvent) => {
        event.preventDefault()
        setIsActive(false)
    }
    const mainContainerOnMouseOverHandler = (event: React.MouseEvent) => {
        setIsHover(true)
    }
    const mainContainerOnMouseOutHandler = (event: React.MouseEvent) => {
        setIsHover(false)
    }
    const removeValueOnClickHandler = (event: React.MouseEvent) => {
        setInputVal('')

        setVisibleCloseBtn(false);
    }

    return(
        <SearchBarPresenter
            inputOnClickHandler={inputOnClickHandler}
            inputOnChangeHandler={inputOnChangeHandler}
            inputOnBlurHandler={inputOnBlurHandler}
            onMouseOverHandler={mainContainerOnMouseOverHandler}
            onMouseOutHandler={mainContainerOnMouseOutHandler}
            isHover={isHover}
            isActive={isActive}
            inputVal={inputVal}
            isVisibleClose={visibleCloseBtn}
            removeValueOnClickHandler={removeValueOnClickHandler}
        />
    );
}

export default SearchBarContainer;
