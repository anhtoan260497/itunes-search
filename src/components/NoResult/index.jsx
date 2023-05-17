import React from 'react';
import './styles.scss'
import { useSelector } from 'react-redux';


function NoResult() {

    const isError = useSelector(state => state.searchResult.isError)

    return (
        <div className='no-result-container text-center'>
            {!isError ? `No Result` : `Failed to fetch API. turn on private mode to use search engine`}
        </div>
    );
}

export default NoResult;