import { combineReducers } from 'redux';
import filter from "../features/filter/filterSlice";
import cart from "../features/cart/cartSlice";
import goods from "../features/goods/goodsSlice";
import settings from "../features/settings/settingsSlice";

export default combineReducers({
  filter,
  cart,
  goods,
  settings,
});