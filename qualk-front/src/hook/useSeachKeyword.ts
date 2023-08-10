import React from 'react';

function useSeachKeyword(){
    const STORAGE_KEY = 'searchKeyword';

    const getSeachKeyword = () => {
        let currentData = localStorage.getItem(STORAGE_KEY)

        if(currentData){
            return JSON.parse(currentData);
        }
        return null;
    }

    const pushSearchKeyword = ({keyword}: {keyword: string}) => {
        let items = getSeachKeyword();
        let newItems = [];

        if(Array.isArray(items)){
            newItems = [keyword, ...items]
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems))
        } 
    }

    const popSearchKeyword = () => {
        let items = getSeachKeyword();
        let newItems = [];

        if(items && Array.isArray(items)){
            newItems = [...items];
            newItems.pop();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems))
        }
    }

    const writeKeyword = ({keyword}:{keyword: string}) => {
        let items = getSeachKeyword();
        const newItems = [];
        const isItemsOverWrite = items && items.length >= 9;
        const isAlreadyWrited = items ? items.includes(keyword) : false;
        
        if(items){
            if(isAlreadyWrited){
                let currentItems = getSeachKeyword();
                let filterData = currentItems.filter((item: string) => item !== keyword)
                
                localStorage.setItem(STORAGE_KEY, JSON.stringify(filterData));
            }

            if(isItemsOverWrite){
                popSearchKeyword();
                pushSearchKeyword({keyword});
            } else {
                pushSearchKeyword({keyword});
            }
        } else {
            newItems.push(keyword);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
        }
    }

    return {
        writeKeyword,
        getSeachKeyword,
    }
}

export default useSeachKeyword;