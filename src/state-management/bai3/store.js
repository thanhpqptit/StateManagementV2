import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const STORAGE_KEY = 'mini-shop-cart';

// Đọc giỏ hàng đã lưu làm initialState (lỗi hoặc chưa có thì bỏ qua)
function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : undefined;
  } catch {
    return undefined;
  }
}

const savedCart = loadCart();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: savedCart ? { cart: savedCart } : undefined,
});

// Mỗi khi state đổi → lưu lại phần cart
store.subscribe(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().cart));
});
