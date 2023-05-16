import { combineReducers, configureStore } from '@reduxjs/toolkit';
import SearchSlice from '../features/SearchSlice';

const reducers = combineReducers({
    searchResult : SearchSlice.reducer
})

const store = configureStore({
    reducer : reducers
})

export default store