import { createSlice } from '@reduxjs/toolkit';


const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {

    addItem: (state, action) => {
      const found = state.items.find((item) => item.id === action.payload.id);
      if (found) {
        found.qty += 1;
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
    },

    increase: (state, action) => {
      const found = state.items.find((item) => item.id === action.payload);
      if (found) found.qty += 1;
    },

    decrease: (state, action) => {
      const found = state.items.find((item) => item.id === action.payload);
      if (!found) return;
      found.qty -= 1;
      if (found.qty <= 0) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, increase, decrease, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectItems = (state) => state.cart.items;
export const selectTotalQty = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.qty, 0);
export const selectTotalPrice = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
