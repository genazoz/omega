import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from "axios";
import {RootState} from "../../app/store";

type FetchCountOfPagesArgs = {
  querySearch: string;
  goodsPerPage: number;
}

export const fetchCountOfPages = createAsyncThunk('goods/fetchCountOfPagesStatus', async (args: FetchCountOfPagesArgs) => {
  const {querySearch, goodsPerPage} = args;

  var {data} = await axios.get(`${process.env.REACT_APP_API_URL}products?${querySearch}`);

  return Math.ceil(data.length / goodsPerPage);
})

interface FilterSliceState {
  activeCategoriesIds: number[];
  currentPage: number;
  countOfPages: number;
  searchQuery: string;
}

const initialState: FilterSliceState = {
  activeCategoriesIds: [],
  currentPage: 0,
  countOfPages: 1,
  searchQuery: '',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setCountOfPages(state, action: PayloadAction<number>) {
      state.countOfPages = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<{ currentPage: number; }>) {
      state.currentPage = action.payload.currentPage;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountOfPages.pending, (state) => {
      state.countOfPages = 1;
    })
    builder.addCase(fetchCountOfPages.fulfilled, (state, action) => {
      state.countOfPages = action.payload;
    })
    builder.addCase(fetchCountOfPages.rejected, (state) => {
      state.countOfPages = 1;
    })
  },
})

export const filterSelector = (state: RootState) => state.filter;

export const {setCountOfPages, setCurrentPage, setFilters, setSearchQuery} = filterSlice.actions

export default filterSlice.reducer