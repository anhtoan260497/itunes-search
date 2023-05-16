import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchAPI } from "../api/searchAPI";

const initialState = {
  result: [],
  isLoading: false,
  keyword: "",
  isExplicit: false,
  price: 100,
  amount: 15,
  isSearch: false,
  playId : ''
};

export const getSearchResult = createAsyncThunk(
  "SearchSlice/getSearchResult",
  async (params,thunkAPI) => {
    const currentState = thunkAPI.getState().searchResult
    const {keyword,isExplicit,price,amount} = currentState
    try {
      const res = await searchAPI.search({keyword,isExplicit,amount});
      return res.data.results.filter(item => item.trackPrice < price);
    } catch (err) {
      console.log(err);
    }
  }
);

export const SearchSlice = createSlice({
  name: "SearchSlice",
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setIsExplicit: (state, action) => {
      state.isExplicit = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setPlayId : (state,action) => {
      state.playId = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchResult.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSearchResult.rejected, (state) => {
      state.isLoading = false;
      console.log("error");
    });
    builder.addCase(getSearchResult.fulfilled, (state, action) => {
      state.isLoading = false;
      state.result = action.payload;
      state.isSearch = true;
    });
  },
});

export const { setKeyword, setIsExplicit, setPrice, setAmount,setPlayId } =
  SearchSlice.actions;
export default SearchSlice;
