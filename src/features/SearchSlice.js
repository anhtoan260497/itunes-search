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
  playId: "",
  isError: false,
};

export const getSearchResult = createAsyncThunk(
  "SearchSlice/getSearchResult",
  async (params, thunkAPI) => {
    const currentState = thunkAPI.getState().searchResult;
    const { keyword, isExplicit, price, amount } = currentState;
    try {
      const res = await searchAPI.search({ keyword, isExplicit, amount });
      console.log(res);
      return res.data.results.filter((item) => item.trackPrice < price);
    } catch (err) {
      console.log(err);
      throw err;
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
    setPlayId: (state, action) => {
      state.playId = action.payload;
    },
    setIsSearch:(state,action) => {
      state.isSearch = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchResult.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(getSearchResult.rejected, (state) => {
      state.result = [];
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(getSearchResult.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.result = action.payload;
      state.isSearch = true;
    });
  },
});

export const { setKeyword, setIsExplicit, setPrice, setAmount, setPlayId, setIsSearch } =
  SearchSlice.actions;
export default SearchSlice;
