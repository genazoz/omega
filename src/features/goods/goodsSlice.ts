import {createSlice} from '@reduxjs/toolkit'
import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../../app/store";
import {fetchCountOfPages} from "../filter/filterSlice";
import {removeItem} from "../cart/cartSlice";

type FetchGoodsArgs = {
  querySearch: string;
  goodsPerPage: number;
  currentPage: number;
}

type AddGoodsArgs = {
  title: string;
  price: number;
  description: string;
  formData: FormData,
  searchQuery: string;
  goodsPerPage: number;
  currentPage: number;
}
type DeleteGoodsArgs = {
  id: string;
  searchQuery: string;
  goodsPerPage: number;
  currentPage: number;
}

export type Goods = {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
}

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

interface GoodsSliceState {
  items: Goods[];
  status: Status;
  removingStatus: Status;
  addingStatus: Status;
}

export const fetchGoods = createAsyncThunk<Goods[], FetchGoodsArgs>('goods/fetchGoods', async (args) => {
  const {querySearch, goodsPerPage, currentPage} = args;

  var {data} = await axios.get<Goods[]>(`${process.env.REACT_APP_API_URL}products?p=${currentPage}&l=${goodsPerPage}${querySearch}`);

  return data;
})
export const addNewGoods = createAsyncThunk('goods/addNewGoods', async (args: AddGoodsArgs, {dispatch}) => {
  try {
    // Mockapi не возвращает общее кол-во продуктов, поэтому использую дополнительные запросы
    let {data} = await axios.post('https://api.cloudinary.com/v1_1/genazoz-cloud/image/upload', args.formData);
    const url = data.url;
    const {title, price, description, currentPage, goodsPerPage, searchQuery} = args;
    const goodsData = {
      title,
      price,
      imageUrl: url,
      description
    };
    await axios.post(`${process.env.REACT_APP_API_URL}products`, goodsData);
    ({data} = await axios.get<Goods[]>(`${process.env.REACT_APP_API_URL}products?p=${currentPage}&l=${goodsPerPage}${searchQuery}`));
    dispatch(setItems(data))
    await dispatch(fetchCountOfPages({querySearch: searchQuery, goodsPerPage}))
    return 'success';
  } catch (err) {
    console.warn(err)
    return err;
  }
})
export const removeGoods = createAsyncThunk('goods/removeGoods', async (args: DeleteGoodsArgs, {dispatch}) => {
  try {
    const {id, currentPage, goodsPerPage, searchQuery} = args;
    await axios.delete(`${process.env.REACT_APP_API_URL}products/${id}`);
    const {data} = await axios.get<Goods[]>(`${process.env.REACT_APP_API_URL}products?p=${currentPage}&l=${goodsPerPage}${searchQuery}`);
    dispatch(setItems(data))
    await dispatch(fetchCountOfPages({querySearch: searchQuery, goodsPerPage}))
    dispatch(removeItem(id));
    return 'success';
  } catch (err) {
    console.warn(err)
    return err;
  }
})

const initialState: GoodsSliceState = {
  items: [],
  addingStatus: Status.SUCCESS,
  removingStatus: Status.SUCCESS,
  status: Status.LOADING // loading | success | error
}

export const goodsSlice = createSlice({
  name: 'goods',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGoods.pending, (state) => {
      state.status = Status.LOADING;
    })
    builder.addCase(fetchGoods.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    })
    builder.addCase(fetchGoods.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    })
    builder.addCase(addNewGoods.pending, (state) => {
      state.addingStatus = Status.LOADING;
    })
    builder.addCase(addNewGoods.fulfilled, (state) => {
      state.addingStatus = Status.SUCCESS;
    })
    builder.addCase(addNewGoods.rejected, (state) => {
      state.addingStatus = Status.ERROR;
    })
    builder.addCase(removeGoods.pending, (state) => {
      state.removingStatus = Status.LOADING;
    })
    builder.addCase(removeGoods.fulfilled, (state) => {
      state.removingStatus = Status.SUCCESS;
    })
    builder.addCase(removeGoods.rejected, (state) => {
      state.removingStatus = Status.ERROR;
    })
  },
})

export const goodsSelector = (state: RootState) => state.goods;

export const {setItems} = goodsSlice.actions

export default goodsSlice.reducer