import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../../app/store";

interface SettingsSliceState {
  goodsPerPage: number,
  showCart: boolean,
  showCreateProductModal: boolean
}

const initialState: SettingsSliceState = {
  goodsPerPage: 20,
  showCart: false,
  showCreateProductModal: false
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setShowCart(state, action: PayloadAction<boolean>) {
      state.showCart = action.payload;
    },
    setShowCreateProductModal(state, action: PayloadAction<boolean>) {
      state.showCreateProductModal = action.payload;
    },
  },
})

export const settingsSelector = (state: RootState) => state.settings;

export const {setShowCart, setShowCreateProductModal} = settingsSlice.actions

export default settingsSlice.reducer