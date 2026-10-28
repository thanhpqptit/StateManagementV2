import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    // action.payload: product { id, name, price }
    addItem: (state, action) => {
      // Bài 2 chưa có số lượng: sản phẩm đã có trong giỏ thì bỏ qua (Bài 3 sẽ tăng qty)
      if (state.items.some((item) => item.id === action.payload.id)) return;
      state.items.push(action.payload); // Immer cho phép "sửa" trực tiếp
    },
    // action.payload: id
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
